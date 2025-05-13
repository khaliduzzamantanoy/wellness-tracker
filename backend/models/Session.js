// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["study", "exercise"],
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    sessionCount: {
      type: Number,
      required: true,
    },
    breakDuration: {
      type: Number,
      required: true,
    },
    exerciseType: {
      type: String,
      enum: ["cardio", "strength"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
