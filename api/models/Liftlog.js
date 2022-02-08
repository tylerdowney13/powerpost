const mongoose = require("mongoose");

const LiftlogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    weightclass: {
      type: String,
    },
    maxSquat: {
      type: String,
    },
    maxBench: {
      type: String,
    },
    maxDeadlift: {
      type: String,
    },
    total: {
      type: Array,
      default: [],
    },
    squat: {
      type: Array,
      default: [],
    },
    bench: {
      type: Array,
      default: [],
    },
    deadlift: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Liftlog", LiftlogSchema);
