import React from "react";

const ExpenseSummary = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryMap = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const mostCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const mostCategoryAmount = categoryMap[mostCategory] || 0;

  const highestExpense = expenses.reduce(
    (max, exp) => (exp.amount > max.amount ? exp : max),
    { amount: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mb-6">
      <div className="bg-green-100 p-6 rounded-xl text-center shadow">
        <h4 className="text-sm font-medium text-green-800">Total Expense</h4>
        <p className="text-2xl font-bold text-green-900 mt-2">₹{total}</p>
        <p className="text-sm text-green-700 mt-1">total spent on the plan</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-xl text-center shadow">
        <h4 className="text-sm font-medium text-purple-800">Most Spent Category</h4>
        <p className="text-2xl font-bold text-purple-900 mt-2">₹{mostCategoryAmount}</p>
        <p className="text-sm text-purple-700 mt-1">🚗 {mostCategory}</p>
      </div>
      <div className="bg-red-100 p-6 rounded-xl text-center shadow">
        <h4 className="text-sm font-medium text-red-800">Highest Single Expense</h4>
        <p className="text-2xl font-bold text-red-900 mt-2">₹{highestExpense.amount}</p>
        <p className="text-sm text-red-700 mt-1">spent on 🚗 {highestExpense.category}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;