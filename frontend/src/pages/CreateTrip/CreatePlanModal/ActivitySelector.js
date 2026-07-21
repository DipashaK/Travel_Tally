import { Sparkles } from "lucide-react";
import { ACTIVITIES, STAMP_ROT, T } from "./constants";

const ActivitySelector = ({
  selectedActivities,
  toggleActivity,
}) => {
  return (
    <div>
      <label
        className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-2"
        style={{ color: T.inkSoft }}
      >
        <Sparkles size={14} />
        Activities
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {ACTIVITIES.map((activity, index) => {
          const active = selectedActivities.includes(activity);

          return (
            <button
              key={activity}
              onClick={() => toggleActivity(activity)}
              className={`gt-chip rounded-full px-2 py-2 text-[11px] font-semibold relative ${
                active ? "gt-stamp" : ""
              }`}
              style={{
                border: `2px ${
                  active ? "solid" : "dashed"
                } ${active ? T.coral : T.line}`,
                color: active ? T.coral : T.inkSoft,
                background: active
                  ? "rgba(228,98,63,0.08)"
                  : "transparent",
                transform: active
                  ? `rotate(${STAMP_ROT[index % STAMP_ROT.length]}deg)`
                  : "none",
              }}
            >
              {activity}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivitySelector;