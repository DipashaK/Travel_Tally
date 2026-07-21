import {
  Sparkles,
  Loader2,
  Check,
} from "lucide-react";
import { T } from "./constants";

const PlanButtons = ({
  onSave,
  onGenerate,
  loading,
  saved,
}) => {
  return (
    <div className="flex gap-3 mt-5">
      <button
        onClick={onSave}
        className="gt-chip flex-1 rounded-md py-2.5 font-semibold text-sm flex items-center justify-center gap-2"
        style={{
          background: saved ? T.sage : "#fff",
          color: saved ? "#fff" : T.ink,
          border: `1.5px solid ${
            saved ? T.sage : T.line
          }`,
        }}
      >
        {saved && <Check size={15} />}
        {saved ? "Saved" : "Save Trip"}
      </button>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="gt-chip flex-1 rounded-md py-2.5 font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-70"
        style={{
          background: T.coral,
        }}
      >
        {loading ? (
          <Loader2
            size={15}
            className="gt-spin"
          />
        ) : (
          <Sparkles size={15} />
        )}

        {loading
          ? "Generating..."
          : "Generate AI Plan"}
      </button>
    </div>
  );
};

export default PlanButtons;