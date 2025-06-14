import React, { useState } from "react";

const PackingChecklist = ({ items = [], destination }) => {
  const safeItems = (Array.isArray(items) ? items : (typeof items === 'string' ? items.split("\n") : []))
    .filter(item => item && item.trim() !== "");

  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div>
      <ul className="space-y-2 mt-4 cursor-pointer">
        {safeItems.length === 0 ? (
          <li className="text-gray-500">No items in the checklist.</li>
        ) : (
          safeItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkedItems.includes(item)}
                onChange={() => toggleItem(item)}
                className="w-4 h-4"
              />
              <span className={checkedItems.includes(item) ? "line-through text-gray-500" : ""}>
                {item}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PackingChecklist;
