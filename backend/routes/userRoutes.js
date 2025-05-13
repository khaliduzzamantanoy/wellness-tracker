// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, userController.getProfile);
router.patch("/update-stats", authMiddleware, userController.updateStats);

router.post(
  "/sessions",
  authMiddleware,
  userController.validateSession,
  userController.addSession
);
router.patch(
  "/sessions/:sessionId",
  authMiddleware,
  userController.updateSession
);
router.get("/sessions", authMiddleware, userController.getSessions);

// New routes for session state persistence
router.patch("/save-session", authMiddleware, userController.saveSessionState);
router.get("/session", authMiddleware, userController.getSessionState);

module.exports = router;
