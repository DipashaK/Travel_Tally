// const mongoose = require('mongoose');
// const InviteSchema = new mongoose.Schema({
//   email: String,
//   planId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Plan",
//     required: true
//   },
//   planName: String,
//   inviteLink: String,
//   invitedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   status: {
//     type: String,
//     default: "pending"
//   },
//   createdAt: Date,
// });

// module.exports = mongoose.model('Invite', InviteSchema);





const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  invitedEmails: {
    type: [String], // ✅ Now stores multiple invited emails
    default: [],
  },
  // Add any other fields you already had
}, { timestamps: true });

module.exports = mongoose.model("Plan", PlanSchema);
