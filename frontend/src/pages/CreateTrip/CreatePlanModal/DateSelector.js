import { Calendar } from "lucide-react";
import { T } from "./constants";

const DateSelector = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div>
      <label
        className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-2"
        style={{ color: T.inkSoft }}
      >
        <Calendar size={14} />
        Travel Dates
      </label>

      <div className="flex gap-3">
        <div className="flex-1">
          <span
            className="gt-mono text-[10px]"
            style={{ color: T.inkSoft }}
          >
            Depart
          </span>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="w-full mt-1 px-2 py-2 rounded-md gt-mono text-sm outline-none"
            style={{
              background: "#fff",
              border: `1.5px solid ${T.line}`,
            }}
          />
        </div>

        <div className="flex-1">
          <span
            className="gt-mono text-[10px]"
            style={{ color: T.inkSoft }}
          >
            Return
          </span>

          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            className="w-full mt-1 px-2 py-2 rounded-md gt-mono text-sm outline-none"
            style={{
              background: "#fff",
              border: `1.5px solid ${T.line}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;