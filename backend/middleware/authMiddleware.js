const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded); // 👈 THIS SHOWS WHAT'S INSIDE
    req.user = { id: decoded.userId }; // or decoded.userId — depending on what it shows
    console.log("User from token:", req.user); // should NOT be undefined

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid" });
  }
};

module.exports = authenticateUser;
