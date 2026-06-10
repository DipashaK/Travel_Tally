import React from "react";

const AddExpenseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
  >
    Add a New Expense
  </button>
);

export default AddExpenseButton;