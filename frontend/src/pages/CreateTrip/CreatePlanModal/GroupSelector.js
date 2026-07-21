import { Users } from "lucide-react";
import { GROUPS, T } from "./constants";

const GroupSelector = ({
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <div>
      <label
        className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-2"
        style={{ color: T.inkSoft }}
      >
        <Users size={14} />
        Traveling With
      </label>

      <div className="grid grid-cols-4 gap-2">
        {GROUPS.map((group) => {
          const active =
            selectedGroup === group.label;

          return (
            <button
              key={group.label}
              onClick={() =>
                setSelectedGroup(group.label)
              }
              className="gt-chip rounded-md py-2 flex flex-col items-center gap-1"
              style={{
                background: active
                  ? T.sage
                  : "#fff",
                color: active
                  ? "#fff"
                  : T.ink,
                border: `1.5px solid ${
                  active
                    ? T.sage
                    : T.line
                }`,
              }}
            >
              <span>{group.icon}</span>
              <span>{group.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GroupSelector;