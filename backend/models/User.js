const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  type: { type: String, enum: ["study", "exercise"], required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  caloriesBurned: { type: Number, default: 0 },
  pointsEarned: { type: Number, default: 0 },
  sessionCount: Number,
  breakDuration: Number,
  exerciseType: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  gender: String,
  birthdate: Date,
  weight: Number,
  height: Number,
  bmi: Number,
  points: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  goalCalories: Number,
  sessions: [sessionSchema],
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,

  // Add this field to store routine session state for persistence
  sessionState: {
    type: Object,
    default: {},
  },
});

module.exports = mongoose.model("User", userSchema);
