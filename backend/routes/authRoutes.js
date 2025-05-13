const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
// Add forgot-password and reset-password routes if needed

module.exports = router;
