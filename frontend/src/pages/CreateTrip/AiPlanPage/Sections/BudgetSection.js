import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { parseBudget, convertToList } from "../utils";

const CountUp = ({ value, prefix = "" }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{prefix}{display.toLocaleString()}</span>;
};

const BudgetSection = ({ budget }) => {
  const entries = parseBudget(budget);

  if (!entries) {
    return (
      <ul className="pl-6 space-y-1.5 marker:text-[#C99A44]">
        {convertToList(budget, "💸")}
      </ul>
    );
  }

  const total = entries.reduce((sum, e) => sum + e.amount, 0);
  const max = Math.max(...entries.map((e) => e.amount));

  return (
    <div>
      <div className="mb-6 p-5 rounded-xl bg-[#0F3D3E] text-[#FBF3E7] text-center">
        <p className="uppercase tracking-[0.2em] text-[10px] text-[#C99A44] mb-1">
          Estimated total
        </p>
        <p className="text-4xl font-serif">
          <CountUp value={total} />
        </p>
      </div>

      <div className="space-y-3">
        {entries.map((entry, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#1B1B18]/80">{entry.label}</span>
              <span className="font-medium text-[#1B1B18]">
                <CountUp value={entry.amount} />
              </span>
            </div>
            <div className="h-2 bg-[#1B1B18]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#C99A44] to-[#E8674F]"
                initial={{ width: 0 }}
                animate={{ width: `${(entry.amount / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSection;