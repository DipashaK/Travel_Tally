import React from "react";

const ExpenseTable = ({ expenses, onDelete }) => (
  <table className="w-full max-w-4xl border-collapse mb-8">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">For</th>
        <th className="border p-2">Who Spent</th>
        <th className="border p-2">Category</th>
        <th className="border p-2">Amount</th>
        <th className="border p-2">Date</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((exp, index) => (
        <tr key={index} className="text-center">
          <td className="border p-2">{exp.forWhat}</td>
          <td className="border p-2">{exp.whoSpent}</td>
          <td className="border p-2">{exp.category}</td>
          <td className="border p-2">₹{exp.amount}</td>
          <td className="border p-2">{exp.date}</td>
          <td className="border p-2">
            <button
              onClick={() => onDelete(index)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ExpenseTable;