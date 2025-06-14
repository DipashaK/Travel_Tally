const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
  registerController,
  loginController,
} = require("../controllers/authController");

router.post("/signup", registerController);
router.post("/login", loginController);

// PROTECTED ROUTE EXAMPLE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

module.exports = router;