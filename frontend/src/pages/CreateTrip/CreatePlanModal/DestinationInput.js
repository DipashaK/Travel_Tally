import { useState, useRef } from "react";
import { MapPin, Plane, Compass, Home } from "lucide-react";
import { T } from "./constants";
import { getCountryFlag } from "./utils";
import { searchPlaces } from "./api";

const DestinationInput = ({
  destination,
  setDestination,
  locked = false,
  setLocked = () => {}, // Default empty function
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const timer = useRef(null);

  const handleInput = (e) => {
    const value = e.target.value;

    setDestination(value);

    // Safe even if parent doesn't pass setLocked
    setLocked?.(false);

    clearTimeout(timer.current);

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    timer.current = setTimeout(async () => {
      try {
        const data = await searchPlaces(value);
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    }, 350);
  };

  const handleSelect = (place) => {
    setDestination(place.display_name.split(",")[0]);
    setSuggestions([]);

    // Safe even if parent doesn't pass setLocked
    setLocked?.(true);
  };

  return (
    <div className="relative">
      <label
        className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-2"
        style={{ color: T.inkSoft }}
      >
        <MapPin size={14} />
        Destination
      </label>

      <input
        type="text"
        placeholder="Where to?"
        value={destination}
        onChange={handleInput}
        className="w-full px-3 py-2.5 rounded-md text-lg gt-display outline-none"
        style={{
          background: "#fff",
          border: `1.5px solid ${T.line}`,
          color: T.ink,
        }}
      />

      {suggestions.length > 0 && (
        <div
          className="absolute z-20 w-full mt-1 rounded-md shadow-lg max-h-56 overflow-y-auto"
          style={{
            background: "#fff",
            border: `1px solid ${T.line}`,
          }}
        >
          {suggestions.map((place) => (
            <div
              key={place.place_id}
              onClick={() => handleSelect(place)}
              onMouseDown={(e) => e.preventDefault()}
              className="px-3 py-2 flex items-center gap-2 cursor-pointer text-sm hover:bg-gray-100"
            >
              <span>{getCountryFlag(place.address?.country_code)}</span>
              <span className="truncate">{place.display_name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <Home size={14} style={{ color: T.teal }} />
          <span
            className="gt-mono text-[9px]"
            style={{ color: T.inkSoft }}
          >
            HOME
          </span>
        </div>

        <div className="relative flex-1 h-6">
          <svg viewBox="0 0 200 24" className="w-full h-full">
            <path
              d="M2,12 Q100,-6 198,12"
              fill="none"
              stroke={T.line}
              strokeWidth="2"
              strokeDasharray="4 5"
              strokeLinecap="round"
              style={
                locked
                  ? {
                      strokeDasharray: 260,
                      animation: "gt-dash 1.1s ease forwards",
                    }
                  : {
                      strokeDasharray: 260,
                      strokeDashoffset: 260,
                    }
              }
            />

            {locked && (
              <g
                style={{
                  offsetPath: "path('M2,12 Q100,-6 198,12')",
                  animation: "gt-plane-fly 1.6s ease forwards",
                }}
              >
                <g transform="rotate(90)">
                  <Plane size={14} color={T.coral} />
                </g>
              </g>
            )}
          </svg>
        </div>

        <div className="flex flex-col items-center gap-1 min-w-[3.5rem]">
          <Compass
            size={14}
            style={{
              color: locked ? T.coral : T.inkSoft,
            }}
          />

          <span
            className="gt-mono text-[9px] truncate max-w-[4rem]"
            style={{ color: T.inkSoft }}
          >
            {destination
              ? destination.slice(0, 10).toUpperCase()
              : "?"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationInput;