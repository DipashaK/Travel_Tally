import {
  Compass,
  Loader2,
  Check,
} from "lucide-react";
import { T } from "./constants";

const AIPlanDisplay = ({
  aiPlan,
  loading,
}) => {
  if (!aiPlan && !loading) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center text-center gap-3 py-16"
        style={{
          color: T.inkSoft,
        }}
      >
        <Compass
          size={30}
          strokeWidth={1.3}
        />

        <p
          className="gt-display text-lg"
          style={{
            color: T.ink,
          }}
        >
          Your itinerary prints here
        </p>

        <p className="text-xs max-w-[16rem]">
          Fill in the stub on the left,
          then generate your plan to see
          it come off the press.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
          <div
            className="w-full h-1/6"
            style={{
              background: `linear-gradient(${T.coral}22, transparent)`,
              animation:
                "gt-scan 1.8s linear infinite",
            }}
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        {loading ? (
          <Loader2
            size={16}
            className="gt-spin"
            style={{
              color: T.coral,
            }}
          />
        ) : (
          <Check
            size={16}
            style={{
              color: T.sage,
            }}
          />
        )}

        <span
          className="gt-mono text-[10px] tracking-widest uppercase"
          style={{
            color: T.inkSoft,
          }}
        >
          {loading
            ? "Printing itinerary..."
            : "Itinerary confirmed"}
        </span>
      </div>

      <p
        className="whitespace-pre-line text-sm leading-relaxed gt-mono"
        style={{
          color: T.ink,
        }}
      >
        {aiPlan || "..."}
      </p>
    </div>
  );
};

export default AIPlanDisplay;