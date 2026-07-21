import React from "react";
import "../../index.css";

const TravelPlanCard = ({ plan }) => {
  const { destination, date, weather, generatedPlan, activities, budget } = plan;

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 overflow-hidden">
      {/* soft corner accent instead of flat pink block */}
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[var(--tt-gold)]/25 group-hover:scale-125 transition-transform duration-500" />

      <p className="font-mono-tt text-[10px] tracking-[0.2em] uppercase text-[var(--tt-teal)]/60 mb-1 relative">
        Destination
      </p>
      <h3 className="font-display text-2xl font-semibold text-[var(--tt-teal)] mb-2 relative group-hover:text-[var(--tt-coral)] transition-colors">
        {destination?.name}
      </h3>

      <p className="text-[var(--tt-ink)]/80 text-sm relative">
        <span className="font-semibold">Date:</span> {date}
      </p>
      <p className="text-[var(--tt-ink)]/80 text-sm relative">
        <span className="font-semibold">Weather:</span> {weather}
      </p>

      {generatedPlan && (
        <div className="mt-3 relative">
          <p className="font-semibold text-[var(--tt-ink)] text-sm">Generated Plan:</p>
          <p className="text-[var(--tt-ink)]/70 text-sm whitespace-pre-line">{generatedPlan}</p>
        </div>
      )}

      {activities && activities.length > 0 && (
        <div className="mt-3 relative">
          <p className="font-semibold text-[var(--tt-ink)] text-sm">Activities:</p>
          <ul className="list-disc list-inside text-[var(--tt-ink)]/70 text-sm">
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      )}

      {budget && (
        <p className="text-[var(--tt-ink)]/80 text-sm mt-3 relative">
          <span className="font-semibold">Budget:</span> ₹{budget}
        </p>
      )}
    </div>
  );
};

export default TravelPlanCard;