const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Invite = require("../models/Invite");
const authenticateUser = require("../middleware/authMiddleware");
const Plan = require("../models/Plan")

// Invite people (only logged-in users can send invites)
router.post("/invite", authenticateUser, async (req, res) => {
  const { email, planId, planName, inviteLink } = req.body;

  if (!email || !planId || !planName || !inviteLink) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Travel Tally" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `You're invited to join the ${planName} Travel Plan`,
    html: `<h2>You are invited to ${planName}</h2><a href="${inviteLink}">Click here to join</a>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Save invite to DB with sender's user ID
    await Invite.create({
      email,
      planId,
      planName,
      inviteLink,
      invitedBy: req.user.id,
    });

    // Update invitedEmail in Plan document
    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      { invitedEmail: email },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found to update invitedEmail" });
    }

    res.status(200).json({ message: "Invite email sent, saved, and invitedEmail updated." });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send email or update invitedEmail" });
  }
});


// Fetch invites (only for invites sent by this user for a plan)
router.get("/invites", authenticateUser, async (req, res) => {
  const { planId } = req.query;
  const userId = req.user.id;

  if (!planId) {
    return res.status(400).json({ message: "planId query parameter is required" });
  }

  try {
    const invites = await Invite.find({
      planId: planId,   // Make sure planId is exactly matched
      invitedBy: userId,
    });
    res.json(invites);
  } catch (err) {
    console.error("Error fetching invites:", err);
    res.status(500).json({ message: "Failed to fetch invites" });
  }
});


// Revoke invite (only owner can revoke)
router.post("/revoke-invite", authenticateUser, async (req, res) => {
  const { email, planId } = req.body;

  if (!email || !planId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Delete invite only if user is the owner (invitedBy matches)
    const invite = await Invite.findOneAndDelete({
      email,
      planId,
      invitedBy: req.user.id,
    });

    if (!invite) {
      return res.status(404).json({ message: "Invite not found or unauthorized" });
    }

    res.status(200).json({ message: "Invite revoked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while revoking invite" });
  }
});

module.exports = router;