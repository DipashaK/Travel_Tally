import React from "react";
import "../../index.css";

const CreatePlanModal = ({ isOpen, onClose, selectedPlan }) => {
  const isViewMode = Boolean(selectedPlan);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[var(--tt-ink)]/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="animate-modal-in bg-white rounded-2xl p-6 w-[90%] max-w-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-[var(--tt-gold)] border-2 border-dashed border-[var(--tt-ink)]/70 rotate-[-12deg] flex items-center justify-center">
          <span className="font-mono-tt text-[9px]">✈️</span>
        </div>

        <h2 className="font-display text-2xl font-semibold mb-4 text-[var(--tt-teal)]">
          {isViewMode ? "View Travel Plan" : "Create New Travel Plan"}
        </h2>

        {isViewMode ? (
          <div className="space-y-2 text-[var(--tt-ink)]/90">
            <p><strong>📍 Destination:</strong> {selectedPlan.destination}</p>
            <p><strong>📅 Start Date:</strong> {selectedPlan.startDate}</p>
            <p><strong>📅 End Date:</strong> {selectedPlan.endDate}</p>
            <p><strong>👥 Group:</strong> {selectedPlan.selectedGroup}</p>
            <p><strong>💰 Budget:</strong> ${selectedPlan.budget}</p>
            <p><strong>🎯 Activities:</strong> {selectedPlan.selectedActivities.join(", ")}</p>
            <div className="mt-4 pt-4 border-t border-dashed border-[var(--tt-sage)]/50 whitespace-pre-line font-mono-tt text-sm">
              {selectedPlan.aiPlan}
            </div>
          </div>
        ) : (
          <p className="text-[var(--tt-ink)]/70">[Your Create Plan Form Goes Here]</p>
        )}

        <div className="mt-6 text-right">
          <button
            className="bg-[var(--tt-coral)] hover:bg-[var(--tt-teal)] text-white px-5 py-2 rounded-lg transition-all duration-300 active:scale-95"
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