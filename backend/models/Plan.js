

const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: String,
  startDate: String,
  endDate: String,
  selectedActivities: [String],
  selectedGroup: String,
  budget: String,
  aiPlan: String,
  invitedEmail: {
    type: String,
    default: null, 
  },
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);
