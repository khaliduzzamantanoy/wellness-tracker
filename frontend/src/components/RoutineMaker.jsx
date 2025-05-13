import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const exerciseCombos = {
  cardio: {
    name: "Cardio Combo",
    description: "Running, Jumping Jacks, High Knees",
    caloriesPerMinute: 10,
  },
  strength: {
    name: "Strength Combo",
    description: "Push-ups, Squats, Lunges, Planks",
    caloriesPerMinute: 8,
  },
};

export default function RoutineMaker({
  showNotification,
  onUpdateUserStats,
  token,
}) {
  const [routineType, setRoutineType] = useState("study");
  const [startTime, setStartTime] = useState("");
  const [sessionCount, setSessionCount] = useState(1);
  const [sessionDuration, setSessionDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(5);
  const [exerciseType, setExerciseType] = useState("cardio");
  const [isRoutineActive, setIsRoutineActive] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [routineSessionId, setRoutineSessionId] = useState(null);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Restore running session state from backend
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get("/user/session", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const s = res.data.sessionState;

        if (s?.isRoutineActive) {
          const sessionStart = new Date(s.startTime);
          if (isNaN(sessionStart.getTime())) {
            throw new Error("Invalid start time in sessionState");
          }

          setRoutineType(s.routineType);
          setStartTime(
            sessionStart.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setSessionCount(s.sessionCount);
          setSessionDuration(s.sessionDuration);
          setBreakDuration(s.breakDuration);
          setExerciseType(s.exerciseType);
          setIsRoutineActive(s.isRoutineActive);
          setCurrentSession(s.currentSession);
          setTimeLeft(s.timeLeft);
          setIsBreak(s.isBreak);
          setRoutineSessionId(s.routineSessionId);
        } else {
          // Try to find an unstarted or ongoing session from DB
          const sessionsRes = await axios.get("/user/sessions", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const now = new Date();

          const activeSession = sessionsRes.data.find((s) => {
            const sessionTime = new Date(s.startTime);
            return !s.completed && sessionTime <= now;
          });

          if (activeSession) {
            const sessionStart = new Date(activeSession.startTime);
            const elapsedSeconds = Math.floor((now - sessionStart) / 1000);
            const remainingSeconds = Math.max(
              0,
              activeSession.duration * 60 - elapsedSeconds
            );

            setRoutineType(activeSession.type);
            setStartTime(sessionStart.toISOString().slice(0, 16));
            setSessionCount(activeSession.sessionCount);
            setSessionDuration(activeSession.duration);
            setBreakDuration(activeSession.breakDuration);
            setExerciseType(activeSession.exerciseType || "cardio");
            setIsRoutineActive(true);
            setCurrentSession(activeSession.currentSession || 0);
            setTimeLeft(remainingSeconds);
            setIsBreak(activeSession.isBreak || false);
            setRoutineSessionId(activeSession.sessionId);
          }
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
        showNotification("Failed to restore session", "error");
      }
    };

    if (token) restoreSession();
  }, [token]);

  // Persist session state to backend
  useEffect(() => {
    const saveSessionState = async () => {
      const sessionState = {
        routineType,
        startTime,
        sessionCount,
        sessionDuration,
        breakDuration,
        exerciseType,
        isRoutineActive,
        currentSession,
        timeLeft,
        isBreak,
        routineSessionId,
      };
      try {
        await axios.patch(
          "/user/save-session",
          { sessionState },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Session save failed:", err.message || err);
      }
    };
    if (isRoutineActive && token) saveSessionState();
  }, [
    isRoutineActive,
    currentSession,
    timeLeft,
    isBreak,
    token,
    routineType,
    startTime,
    sessionCount,
    sessionDuration,
    breakDuration,
    exerciseType,
    routineSessionId,
  ]);

  function findActiveSession(sessions) {
    const now = new Date();
    return sessions.find((s) => {
      const sessionTime = new Date(s.startTime);
      return !s.completed && sessionTime <= now;
    });
  }

  // Timer countdown and session/break switching
  useEffect(() => {
    if (isRoutineActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isRoutineActive && timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Audio play failed:", err));
      }

      if (Notification.permission === "granted") {
        const title = isBreak ? "Break Over" : "Session Complete!";
        const body = isBreak
          ? `Get ready for session ${currentSession + 2}`
          : "Great job! Time for a break.";
        new Notification(title, { body });
      }

      if (!isBreak) {
        handleSessionComplete();
        if (currentSession < sessionCount - 1) {
          setIsBreak(true);
          setTimeLeft(breakDuration * 60);
          showNotification("Break time! Relax for a bit.", "info");
        } else {
          finishRoutine();
        }
      } else {
        setIsBreak(false);
        setCurrentSession(currentSession + 1);
        setTimeLeft(sessionDuration * 60);
        showNotification(`Session ${currentSession + 2} started!`, "info");
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [
    isRoutineActive,
    timeLeft,
    isBreak,
    currentSession,
    sessionCount,
    breakDuration,
    sessionDuration,
    showNotification,
  ]);

  const startRoutine = async () => {
    if (!startTime) {
      showNotification("Please select a start time", "error");
      return;
    }

    const now = new Date();
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDateTime = new Date();
    startDateTime.setHours(hours, minutes, 0, 0);

    if (startDateTime < now) {
      showNotification("Start time must be in the future", "error");
      return;
    }

    const delay = startDateTime.getTime() - now.getTime();
    showNotification(`Routine scheduled to start at ${startTime}`, "success");

    const sessionId = uuidv4();
    setRoutineSessionId(sessionId);

    if (token) {
      try {
        // ✅ Save session immediately
        await axios.post(
          "/user/sessions",
          {
            session: {
              sessionId,
              type: routineType,
              startTime: startDateTime.toISOString(),
              duration: sessionDuration,
              completed: false,
              caloriesBurned: 0,
              pointsEarned: routineType === "study" ? sessionDuration : 0,
              sessionCount,
              breakDuration,
              exerciseType,
            },
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error(
          "Error saving session:",
          err.response?.data || err.message
        );
        showNotification("Could not save session to server", "error");
      }
    }

    // Schedule the routine to start
    setTimeout(() => {
      setIsRoutineActive(true);
      setCurrentSession(0);
      setTimeLeft(sessionDuration * 60);
      setIsBreak(false);
      showNotification("Routine started!", "success");
    }, delay);
  };
  const handleSessionComplete = async () => {
    if (token && routineSessionId) {
      let calories = 0;
      let points = 0;

      if (routineType === "study") {
        // 🎯 Every 1 minute = 1 point
        points = sessionDuration; // e.g., 45 mins = 45 points
        if (onUpdateUserStats) onUpdateUserStats({ points });
      } else if (routineType === "exercise") {
        const combo = exerciseCombos[exerciseType];
        if (combo) {
          calories = combo.caloriesPerMinute * sessionDuration;
          if (onUpdateUserStats) onUpdateUserStats({ calories });
        }
      }

      if (currentSession === sessionCount - 1) {
        try {
          await axios.patch(
            `/api/user/sessions/${routineSessionId}`,
            {
              completed: true,
              caloriesBurned: calories,
              pointsEarned: points, // Save total points for history
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error("Failed to update session:", err);
        }
      }
    }
  };

  const finishRoutine = () => {
    setIsRoutineActive(false);
    setCurrentSession(0);
    setTimeLeft(0);
    setIsBreak(false);
    setRoutineSessionId(null);
    showNotification("Congratulations! You completed your routine!", "success");

    if (token) {
      axios.patch(
        "/user/save-session",
        { sessionState: {} },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="glass-card p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Create Routine</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Routine Type</label>
          <select
            value={routineType}
            onChange={(e) => setRoutineType(e.target.value)}
            className="w-full border rounded p-2"
            disabled={isRoutineActive}
          >
            <option value="study">Study</option>
            <option value="exercise">Exercise</option>
          </select>
        </div>
        {routineType === "exercise" && (
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Exercise Combo</label>
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className="w-full border rounded p-2"
              disabled={isRoutineActive}
            >
              {Object.entries(exerciseCombos).map(([key, combo]) => (
                <option key={key} value={key}>
                  {combo.name} - {combo.description}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded p-2"
            disabled={isRoutineActive}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Number of Sessions</label>
          <input
            type="number"
            min="1"
            max="10"
            value={sessionCount}
            onChange={(e) => setSessionCount(Number(e.target.value))}
            className="w-full border rounded p-2"
            disabled={isRoutineActive}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-semibold">
            Session Duration (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="120"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(Number(e.target.value))}
            className="w-full border rounded p-2"
            disabled={isRoutineActive}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-semibold">
            Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
            className="w-full border rounded p-2"
            disabled={isRoutineActive}
          />
        </div>
      </div>

      {!isRoutineActive ? (
        <button
          onClick={startRoutine}
          className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-secondary transition"
        >
          Start Routine
        </button>
      ) : (
        <div className="text-center text-2xl font-mono">
          <p>
            {isBreak
              ? `Break Time - Next Session: ${
                  currentSession + 1
                } / ${sessionCount}`
              : `Session: ${currentSession + 1} / ${sessionCount}`}
          </p>
          <p className="text-6xl font-bold mt-2">{formatTime(timeLeft)}</p>
          <button
            onClick={finishRoutine}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Cancel Routine
          </button>
        </div>
      )}

      <audio ref={audioRef} src="public/custom-tone.mp3" preload="auto" />
    </div>
  );
}
