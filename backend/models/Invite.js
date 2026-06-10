const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
  email: String,
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },
  planName: String,
  inviteLink: String,
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.models.Invite || mongoose.model('Invite', InviteSchema);