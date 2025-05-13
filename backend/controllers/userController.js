// controllers/userController.js

const { body, validationResult } = require("express-validator"); // Make sure to install express-validator
const User = require("../models/User");
const Session = require("../models/Session");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpires"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user stats (points + calories)
exports.updateStats = async (req, res) => {
  try {
    const { points = 0, calories = 0 } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.stats) {
      user.stats = { points: 0, calories: 0 };
    }

    user.stats.points += parseInt(points);
    user.stats.calories += parseInt(calories);

    await user.save();

    res.json({
      success: true,
      stats: user.stats,
    });
  } catch (err) {
    console.error("Error in updateStats:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Validate session data before saving
exports.validateSession = [
  body("session.sessionId").notEmpty().withMessage("Session ID is required"),
  body("session.type")
    .isIn(["study", "exercise"])
    .withMessage("Type must be study or exercise"),
  body("session.startTime")
    .isISO8601()
    .toDate()
    .withMessage("Valid startTime is required"),
  body("session.duration").isNumeric().withMessage("Duration is required"),
  body("session.sessionCount")
    .isNumeric()
    .withMessage("Session count is required"),
  body("session.breakDuration")
    .isNumeric()
    .withMessage("Break duration is required"),
  body("session.exerciseType").optional().isIn(["cardio", "strength"]),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Add a new session
exports.addSession = async (req, res) => {
  try {
    const { session } = req.body;
    const sessionToSave = {
      ...session,
      userId: req.user.id,
    };

    const newSession = await Session.create(sessionToSave);

    res.status(201).json({
      success: true,
      sessionId: newSession.sessionId,
    });
  } catch (err) {
    console.error("Error saving session:", err.message || err);
    res.status(500).json({ message: "Failed to save session" });
  }
};

// Update a session
exports.updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = req.body;

    const updatedSession = await Session.findOneAndUpdate(
      { sessionId, userId: req.user.id },
      { $set: updates },
      { new: true }
    );

    if (!updatedSession)
      return res.status(404).json({ message: "Session not found" });

    // Update user stats if session is completed
    if (updates.completed) {
      const user = await User.findById(req.user.id);
      if (!user.stats) user.stats = { points: 0, calories: 0 };

      if (updatedSession.type === "study") {
        user.stats.points += updatedSession.pointsEarned || 10;
      } else if (updatedSession.type === "exercise") {
        user.stats.calories += updatedSession.caloriesBurned || 0;
      }

      await user.save();
    }

    res.json({ success: true, session: updatedSession });
  } catch (err) {
    console.error("Error in updateSession:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sessions for user
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    res.json(sessions);
  } catch (err) {
    console.error("Error in getSessions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Save current routine state
exports.saveSessionState = async (req, res) => {
  try {
    const { sessionState } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.currentSessionState = sessionState;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Error in saveSessionState:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Load saved routine state
exports.getSessionState = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      sessionState: user.currentSessionState || {},
    });
  } catch (err) {
    console.error("Error in getSessionState:", err);
    res.status(500).json({ message: "Server error" });
  }
};
