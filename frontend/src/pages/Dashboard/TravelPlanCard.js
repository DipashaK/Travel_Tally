import React from "react";

const TravelPlanCard = ({ plan }) => {
  const { destination, date, weather, generatedPlan, activities, budget } = plan;

  return (
    <div className="bg-pink-200 p-6 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-bold text-blue-600 mb-2">{destination?.name}</h3>
      <p className="text-gray-700"><span className="font-semibold">Date:</span> {date}</p>
      <p className="text-gray-700"><span className="font-semibold">Weather:</span> {weather}</p>
      {generatedPlan && (
        <div className="mt-3">
          <p className="font-semibold text-gray-800">Generated Plan:</p>
          <p className="text-gray-600 whitespace-pre-line">{generatedPlan}</p>
        </div>
      )}
      {activities && activities.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold text-gray-800">Activities:</p>
          <ul className="list-disc list-inside text-gray-600">
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      )}
      {budget && (
        <p className="text-gray-700 mt-3"><span className="font-semibold">Budget:</span> ₹{budget}</p>
      )}
    </div>
  );
};

export default TravelPlanCard;
