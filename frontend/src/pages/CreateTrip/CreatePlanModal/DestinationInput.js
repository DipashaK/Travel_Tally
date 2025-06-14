import { useState } from "react";
import axios from "axios";

const getCountryFlag = (countryCode) => {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
};

const DestinationInput = ({ destination, setDestination }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length > 1) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: value,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
            headers: {
              "Accept-Language": "en",
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setDestination(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <label className="block font-semibold mb-2 text-lg">Enter your Dream Destination</label>
      <input
        type="text"
        placeholder="Type a place, city, or country..."
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={destination}
        onChange={handleInput}
      />
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((place) => {
            const countryCode = place.address?.country_code;
            const flag = getCountryFlag(countryCode);

            return (
              <div
                key={place.place_id}
                className="cursor-pointer p-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => handleSelect(place)}
              >
                <span>{flag}</span>
                <span>{place.display_name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DestinationInput;