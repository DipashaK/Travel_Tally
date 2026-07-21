import React from "react";
import { motion } from "framer-motion";

const timeIcons = { Morning: "🌅", Afternoon: "🌞", Evening: "🌇", Night: "🌙" };

const ItinerarySection = ({ days }) => {
  if (!days || days.length === 0) {
    return <p className="text-sm text-[#1B1B18]/50">No itinerary available.</p>;
  }

  return (
    <div className="space-y-5">
      {days.map(({ dayIndex, title, sections }) => (
        <motion.div
          key={dayIndex}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: dayIndex * 0.05 }}
          className="rounded-xl border border-[#C99A44]/20 bg-white shadow-sm overflow-hidden"
        >
          <div className="bg-[#0F3D3E] text-[#FBF3E7] px-4 py-2.5 flex items-center gap-2">
            <span className="text-xs font-mono text-[#C99A44]">
              {String(dayIndex + 1).padStart(2, "0")}
            </span>
            <h4 className="font-serif text-base">{title}</h4>
          </div>

          <div className="p-4 space-y-3">
            {sections.map((section, i) => (
              <div key={i} className="border-l-2 border-[#C99A44]/30 pl-3">
                <p className="text-sm font-semibold text-[#0F3D3E] flex items-center gap-1.5 mb-1">
                  <span>{timeIcons[section.period] || "🕒"}</span>
                  {section.period}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-sm text-[#1B1B18]/70 pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ItinerarySection;