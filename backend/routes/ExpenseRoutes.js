// const express = require("express");
// const router = express.Router();
// const Expense = require("../models/Expense");

// // Get all expenses for a trip
// router.get("/:tripId", async (req, res) => {
//   try {
//     const expenses = await Expense.find({ tripId: req.params.tripId });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add new expense
// router.post("/", async (req, res) => {
//   try {
//     const expense = new Expense(req.body);
//     await expense.save();
//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


// router.delete("/:id", async (req, res) => {
//   try {
//     await Expense.findByIdAndDelete(req.params.id);
//     res.json({ message: "Expense deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Get all expenses for a specific plan
router.get("/:planId", async (req, res) => {
  try {
    const expenses = await Expense.find({ planId: req.params.planId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
});

// Add a new expense
router.post("/", async (req, res) => {
  try {
    const { forWhat, whoSpent, category, amount, date, planId } = req.body;
    const newExpense = new Expense({ forWhat, whoSpent, category, amount, date, planId });
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add expense", error: err.message });
  }
});

// Delete an expense by ID
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense", error: err.message });
  }
});

module.exports = router;