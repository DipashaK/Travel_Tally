import React from "react";
import "../../index.css";

const TravelPlansList = ({ travelPlans, searchQuery, onCardClick, loaded }) => {
  const filteredPlans = travelPlans.filter((plan) =>
    plan.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loaded && filteredPlans.length === 0) {
    return (
      <div className="p-16 text-center animate-fade-in-up">
        <div className="text-6xl mb-4 animate-float">🧳</div>
        <p className="font-display text-2xl text-[var(--tt-ink)] mb-1">
          No stamps in this passport yet
        </p>
        <p className="text-[var(--tt-teal)]/70">
          Search again, or create your first travel plan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 pt-8">
      {filteredPlans.map((plan, index) => (
        <div
          key={plan._id}
          onClick={() => onCardClick(plan)}
          className="animate-fade-in-up group relative flex bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-visible"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          {/* rubber-stamp badge */}
          <div className="stamp-badge animate-stamp absolute -top-3 -right-3 z-10 h-14 w-14 rounded-full bg-[var(--tt-gold)] border-2 border-dashed border-[var(--tt-ink)]/70 flex flex-col items-center justify-center rotate-[-12deg] shadow-md">
            <span className="font-mono-tt text-[8px] leading-none text-[var(--tt-ink)] uppercase tracking-tight">
              Booked
            </span>
            <span className="font-mono-tt text-[8px] leading-none text-[var(--tt-ink)]">
              ✓
            </span>
          </div>

          {/* main stub */}
          <div className="flex-1 rounded-l-2xl p-5 pr-4">
            <p className="font-mono-tt text-[10px] tracking-[0.2em] uppercase text-[var(--tt-teal)]/60 mb-1">
              Destination
            </p>
            <h2 className="font-display text-2xl font-semibold text-[var(--tt-teal)] group-hover:text-[var(--tt-coral)] transition-colors duration-300">
              {plan.destination}
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--tt-ink)]/80">
              <span>📅</span>
              <span className="font-mono-tt text-xs">
                {plan.startDate} — {plan.endDate}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-[var(--tt-ink)]/80">
              <span>💰</span>
              <span className="font-mono-tt text-xs">Budget: ${plan.budget}</span>
            </div>
          </div>

          {/* perforated divider with notch cutouts */}
          <div className="relative flex items-center">
            <div className="ticket-dashes h-[calc(100%-16px)] my-2" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[var(--tt-paper)]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[var(--tt-paper)]" />
          </div>

          {/* ticket stub end */}
          <div className="w-16 shrink-0 rounded-r-2xl bg-[var(--tt-teal)] flex items-center justify-center">
            <span
              className="font-mono-tt text-[10px] text-white/80 tracking-[0.3em] uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              Travel Tally
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelPlansList;