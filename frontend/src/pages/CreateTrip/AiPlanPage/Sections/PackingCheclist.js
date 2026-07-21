import React, { useState } from "react";

const PackingChecklist = ({ items = [] }) => {
  const safeItems = (Array.isArray(items) ? items : (typeof items === "string" ? items.split("\n") : []))
    .filter((item) => item && item.trim() !== "");

  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  if (safeItems.length === 0) {
    return <p className="text-sm text-[#1B1B18]/50">No items in the checklist.</p>;
  }

  const packedCount = checkedItems.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#1B1B18]/50">
          {packedCount} of {safeItems.length} packed
        </span>
        <div className="h-1 w-24 bg-[#1B1B18]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E8674F] transition-all"
            style={{ width: `${(packedCount / safeItems.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-2">
        {safeItems.map((item, index) => {
          const checked = checkedItems.includes(item);
          return (
            <li
              key={index}
              onClick={() => toggleItem(item)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition-colors
                ${checked
                  ? "border-[#C99A44]/30 bg-[#C99A44]/5"
                  : "border-[#1B1B18]/10 hover:border-[#C99A44]/40"
                }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleItem(item)}
                className="w-4 h-4 accent-[#E8674F]"
              />
              <span className={`text-sm ${checked ? "line-through text-[#1B1B18]/40" : "text-[#1B1B18]"}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PackingChecklist;