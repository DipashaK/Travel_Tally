require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors({
  origin: "https://traveltally.netlify.app", 
  credentials: true, 
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("AI Travel Planner Backend is Running! 🚀");
});


const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");
const mailRoutes = require("./services/mail");
const weatherRoutes = require("./routes/weatherRoutes");
const joinRoutes = require("./routes/joinRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes"); 
const placesRoutes = require("./routes/placesRoutes");

app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/expenses", expenseRoutes); 
app.use("/api/places", placesRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
