import React from "react";
import "../../index.css";

const SearchBar = ({ searchQuery, setSearchQuery, onOpenModal }) => {
  return (
    <div className="p-5 flex flex-col sm:flex-row gap-4 sm:justify-between items-center bg-white rounded-2xl mx-6 shadow-[0_1px_0_0_var(--tt-sage)] ring-1 ring-[var(--tt-sage)]/20 transition-shadow duration-300 hover:shadow-lg">
      <div className="relative w-full sm:w-1/2">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tt-teal)]/60">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search your destinations..."
          className="pl-10 pr-4 py-2.5 border border-[var(--tt-sage)]/40 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--tt-coral)]/50 focus:border-[var(--tt-coral)] transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        className="group relative bg-[var(--tt-coral)] text-white px-6 py-2.5 rounded-lg font-medium shadow transition-all duration-300 hover:bg-[var(--tt-teal)] hover:shadow-lg active:scale-95 overflow-hidden"
        onClick={onOpenModal}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            ✈️
          </span>
          Create Travel Plan
        </span>
      </button>
    </div>
  );
};

export default SearchBar;