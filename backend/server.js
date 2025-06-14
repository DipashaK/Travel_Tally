// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose
// //   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // // Test Route
// // app.get("/", (req, res) => {
// //   res.send("AI Travel Planner Backend is Running! 🚀");
// // });

// // // Import Routes
// // const userRoutes = require("./routes/userRoutes");
// // const planRoutes = require("./routes/planRoutes");
// // const mailRoutes = require("./services/mail");
// // const weatherRoutes = require("./routes/weatherRoutes");
// // const joinRoutes = require("./routes/joinRoutes");

// // app.use("/api/users", userRoutes);
// // app.use("/api/plans", planRoutes);
// // app.use("/api/plans", planRoutes);
// // app.use("/api/weather", weatherRoutes);
// // app.use("/api/mail", mailRoutes);
// // app.use("/api/join", joinRoutes);

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Test Route
// app.get("/", (req, res) => {
//   res.send("AI Travel Planner Backend is Running! 🚀");
// });

// // Routes
// const userRoutes = require("./routes/userRoutes");
// const planRoutes = require("./routes/planRoutes");
// const mailRoutes = require("./services/mail");
// const weatherRoutes = require("./routes/weatherRoutes");
// const joinRoutes = require("./routes/joinRoutes");
// const expenseRoutes = require("./routes/ExpenseRoutes"); // ✅ NEW

// app.use("/api/users", userRoutes);
// app.use("/api/plans", planRoutes);
// app.use("/api/weather", weatherRoutes);
// app.use("/api/mail", mailRoutes);
// app.use("/api/join", joinRoutes);
// app.use("/api/expenses", expenseRoutes); // ✅ NEW

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("AI Travel Planner Backend is Running! 🚀");
});

// Routes
const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");
const mailRoutes = require("./services/mail");
const weatherRoutes = require("./routes/weatherRoutes");
const joinRoutes = require("./routes/joinRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes"); // ✅ NEW

app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/expenses", expenseRoutes); // ✅ NEW

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
