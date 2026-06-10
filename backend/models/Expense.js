const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  forWhat: { type: String, required: true },
  whoSpent: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
