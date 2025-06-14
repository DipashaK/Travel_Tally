import React from "react";

const TravelPlansList = ({ travelPlans, searchQuery, onCardClick }) => {
  const filteredPlans = travelPlans.filter((plan) =>
    plan.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredPlans.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        No travel plans found. Try creating one! 🌴
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredPlans.map((plan) => (
        <div
          key={plan._id}
          onClick={() => onCardClick(plan)}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border-t-4 border-blue-200 hover:border-blue-400"
        >
          <h2 className="text-2xl font-semibold text-blue-700">{plan.destination}</h2>
          <p className="text-sm text-gray-600 mt-1">📅 {plan.startDate} – {plan.endDate}</p>
          <p className="text-sm text-gray-500 mt-2">💰 Budget: ${plan.budget}</p>
        </div>
      ))}
    </div>
  );
};

export default TravelPlansList;