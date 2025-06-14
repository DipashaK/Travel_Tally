const BudgetSelector = ({ budget, setBudget }) => {
    const budgets = ["Cheap", "Moderate", "Luxury"];
  
    return (
      <div>
        <label className="block font-semibold">Select Budget</label>
        <div className="flex gap-3 mt-2 mb-4">
          {budgets.map((option, index) => (
            <button
              key={index}
              onClick={() => setBudget(option)}
              className={`border p-3 rounded w-full transition ${
                budget === option
                  ? "bg-pink-200 text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default BudgetSelector;