import { useState, useEffect } from "react";
import axios from "axios";
import RoutineMaker from "./RoutineMaker";

// Modal component with blurred background
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      />
      {/* Modal content */}
      <div
        className="fixed top-1/2 left-1/2 z-50 max-w-lg w-full p-6 bg-[rgba(30,41,59,0.85)] backdrop-blur-md rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-xl font-semibold">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 font-bold text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

export default function Dashboard({ onLogout, showNotification }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    weight: null,
    height: null,
    bmi: null,
    points: 0,
    caloriesBurned: 0,
  });

  const [sessions, setSessions] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const token = localStorage.getItem("token");

  const showNotificationSafe = showNotification || (() => {});

  // Fetch user data and sessions
  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, sessionsRes] = await Promise.all([
          axios.get("/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/user/sessions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const userData = userRes.data;

        let bmiValue = null;
        if (userData.weight && userData.height) {
          const heightInMeters = userData.height / 100;
          bmiValue = userData.weight / (heightInMeters * heightInMeters);
        }

        setUser({
          ...userData,
          bmi: bmiValue,
        });

        setUser({
          ...userData,
          bmi: bmiValue,
          points: userData.points ?? 0,
          caloriesBurned: userData.caloriesBurned ?? 0,
        });

        setSessions(Array.isArray(sessionsRes.data) ? sessionsRes.data : []);
      } catch (err) {
        console.error("Failed to fetch data", err);
        showNotificationSafe("Failed to load data", "error");
      }
    }

    if (token) fetchData();
  }, [token]);

  // Update user stats on backend and update local state
  const onUpdateUserStats = async ({ points = 0, calories = 0 }) => {
    try {
      const res = await axios.patch(
        "/user/update-stats",
        { points, calories },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser((prev) => ({
        ...prev,
        points: res.data.stats?.points ?? prev.points,
        caloriesBurned: res.data.stats?.calories ?? prev.caloriesBurned,
      }));
    } catch (err) {
      console.error("Failed to update stats", err);
      showNotificationSafe("Failed to update stats", "error");
    }
  };

  function formatBmi(bmi) {
    return typeof bmi === "number" && !isNaN(bmi) ? bmi.toFixed(1) : "N/A";
  }

  // Filter sessions
  const now = new Date();

  const upcomingSessions = sessions.filter((s) => {
    const sessionTime = new Date(s.startTime);
    return !s.completed && sessionTime > now;
  });

  const historySessions = sessions.filter((s) => {
    const sessionTime = new Date(s.startTime);
    return s.completed || sessionTime < now;
  });

  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  return (
    <div>
      {/* Fixed, blurred Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 1000,
          background: "rgba(30, 41, 59, 0.35)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 24px rgba(30,41,59,0.3)",
          transition: "background 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
        }}
      >
        <div className="text-white font-bold text-xl tracking-wide">
          Wellness Tracker
        </div>
        <ul className="flex space-x-6 text-white cursor-pointer select-none">
          <li onClick={() => openModal("history")} className="hover:underline">
            History
          </li>
          <li onClick={() => openModal("upcoming")} className="hover:underline">
            Upcoming Sessions
          </li>
          <li onClick={() => openModal("about")} className="hover:underline">
            About
          </li>
          <li onClick={() => openModal("contact")} className="hover:underline">
            Contact Us
          </li>
        </ul>
        <button
          onClick={onLogout}
          className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main
        className="p-6 max-w-5xl mx-auto"
        style={{ paddingTop: "88px", paddingBottom: "80px" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">Dashboard</h2>
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="BMI" value={formatBmi(user.bmi)} color="#60a5fa" />
            <StatCard title="Points" value={user.points} color="#34d399" />
            <StatCard
              title="Calories Burned"
              value={user.caloriesBurned}
              color="#fbbf24"
            />
          </div>
        </section>
        <RoutineMaker
          showNotification={showNotificationSafe}
          onUpdateUserStats={onUpdateUserStats}
          token={token}
        />
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          background: "rgba(30, 41, 59, 0.35)",
          backdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 -4px 24px rgba(30, 41, 59, 0.3)",
          color: "white",
          padding: "1rem 2rem",
          fontSize: "0.9rem",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        © 2025 Wellness Tracker. All rights reserved.
      </footer>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "history"}
        onClose={closeModal}
        title="History"
      >
        {historySessions.length === 0 ? (
          <p>No completed sessions yet.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {historySessions.map((session) => (
              <li key={session.sessionId || session._id}>
                <div>
                  <strong>Type:</strong> {session.type}
                </div>
                <div>
                  <strong>Start:</strong>{" "}
                  {new Date(session.startTime).toLocaleString()}
                </div>
                <div>
                  <strong>Duration:</strong> {session.duration} minutes
                </div>
                <div>
                  <strong>Calories Burned:</strong> {session.caloriesBurned}
                </div>
                <div>
                  <strong>Points Earned:</strong> {session.pointsEarned}
                </div>
                <hr className="my-2 border-gray-600" />
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <Modal
        isOpen={activeModal === "upcoming"}
        onClose={closeModal}
        title="Upcoming Sessions"
      >
        {upcomingSessions.length === 0 ? (
          <p>No upcoming sessions scheduled.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {upcomingSessions.map((session) => (
              <li key={session.sessionId || session._id}>
                <div>
                  <strong>Type:</strong> {session.type}
                </div>
                <div>
                  <strong>Start:</strong>{" "}
                  {new Date(session.startTime).toLocaleString()}
                </div>
                <div>
                  <strong>Duration:</strong> {session.duration} minutes
                </div>
                <hr className="my-2 border-gray-600" />
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <Modal
        isOpen={activeModal === "about"}
        onClose={closeModal}
        title="About"
      >
        <p>
          Wellness Tracker helps you balance your study and exercise routines
          with motivation and tracking.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "contact"}
        onClose={closeModal}
        title="Contact Us"
      >
        <p>Email: support@wellnesstracker.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </Modal>
    </div>
  );
}

// Glassmorphism style for StatCards
function StatCard({ title, value, color }) {
  const cardStyle = {
    background: `linear-gradient(120deg, ${color}33 0%, #ffffff22 100%)`,
    borderRadius: "1rem",
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "box-shadow 0.3s",
  };

  return (
    <div style={cardStyle}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value ?? "-"}</p>
    </div>
  );
}
