import React from "react";

const ExpenseModal = ({ isOpen, onClose, formData, setFormData, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-black mb-2">Add Expense</h2>
        <p className="text-gray-500 mb-6">Add your expenses during the travel to efficiently track it at the end.</p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="What purpose did you spend?"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={formData.forWhat}
            onChange={(e) => setFormData({ ...formData, forWhat: e.target.value })}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={formData.whoSpent}
            onChange={(e) => setFormData({ ...formData, whoSpent: e.target.value })}
          >
            <option value="">Select a User</option>
            <option value="You">You</option>
            <option value="Friend">Friend</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Hotel">Hotel</option>
            <option value="Shopping">Shopping</option>
          </select>
          <input
            type="number"
            placeholder="e.g. ₹1000"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;