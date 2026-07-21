import { Wallet } from "lucide-react";
import { BUDGETS, T } from "./constants";

const BudgetSelector = ({
  budget,
  setBudget,
}) => {
  return (
    <div>
      <label
        className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-2"
        style={{ color: T.inkSoft }}
      >
        <Wallet size={14} />
        Fare Class
      </label>

      <div className="grid grid-cols-3 gap-2">
        {BUDGETS.map((item) => {
          const active =
            budget === item.label;

          return (
            <button
              key={item.label}
              onClick={() =>
                setBudget(item.label)
              }
              className="gt-chip rounded-md px-2 py-2 text-left"
              style={{
                background: active
                  ? T.gold
                  : "#fff",
                color: active
                  ? "#fff"
                  : T.ink,
                border: `1.5px solid ${
                  active
                    ? T.gold
                    : T.line
                }`,
              }}
            >
              <div className="gt-mono text-[10px] font-bold">
                {item.code}
              </div>

              <div className="text-[11px]">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetSelector;