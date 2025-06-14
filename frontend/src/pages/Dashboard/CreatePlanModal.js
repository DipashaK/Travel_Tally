import React from "react";

const CreatePlanModal = ({ isOpen, onClose, selectedPlan }) => {
  const isViewMode = Boolean(selectedPlan);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {isViewMode ? "View Travel Plan" : "Create New Travel Plan"}
        </h2>

        {isViewMode ? (
          <div className="space-y-2 text-gray-700">
            <p><strong>📍 Destination:</strong> {selectedPlan.destination}</p>
            <p><strong>📅 Start Date:</strong> {selectedPlan.startDate}</p>
            <p><strong>📅 End Date:</strong> {selectedPlan.endDate}</p>
            <p><strong>👥 Group:</strong> {selectedPlan.selectedGroup}</p>
            <p><strong>💰 Budget:</strong> ${selectedPlan.budget}</p>
            <p><strong>🎯 Activities:</strong> {selectedPlan.selectedActivities.join(", ")}</p>
            <p className="mt-4 whitespace-pre-line">{selectedPlan.aiPlan}</p>
          </div>
        ) : (
          <p>[Your Create Plan Form Goes Here]</p>
        )}

        <div className="mt-6 text-right">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlanModal;