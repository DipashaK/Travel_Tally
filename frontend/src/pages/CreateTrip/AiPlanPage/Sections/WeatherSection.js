import React, { useEffect, useState } from "react";
import { WiHumidity, WiThermometer, WiBarometer, WiDaySunnyOvercast } from "react-icons/wi";
import { FaEye, FaWind } from "react-icons/fa";

const WeatherSection = ({ destination }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination || destination === "Default Destination") {
      setError("Please enter a valid destination.");
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://travel-tally-3mf9.onrender.com/api/weather/get-weather?destination=${destination}`
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch weather data");
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 p-8 text-[#1B1B18]/50 text-sm">
        <span className="h-2 w-2 rounded-full bg-[#C99A44] animate-pulse" />
        Checking the skies over {destination}…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-sm text-[#E8674F] bg-[#E8674F]/5 rounded-lg border border-[#E8674F]/20">
        {error}
      </div>
    );
  }

  if (!weatherData) {
    return <div className="text-center p-4 text-[#1B1B18]/50 text-sm">No weather data available.</div>;
  }

  const {
    location, temperature, condition, windSpeed, windDirection,
    humidity, maxTemp, minTemp, feelsLike, seaLevel, visibility,
  } = weatherData;

  const visibilityPct = Math.max(0, Math.min(100, (visibility / 10) * 100));

  const StatRow = ({ icon, label, value }) => (
    <div className="flex justify-between items-center text-sm py-1.5 border-b border-[#1B1B18]/5 last:border-0">
      <span className="flex items-center gap-2 text-[#1B1B18]/60">{icon} {label}</span>
      <span className="font-medium text-[#1B1B18]">{value}</span>
    </div>
  );

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* Hero temp card */}
      <div className="rounded-xl border border-[#C99A44]/20 bg-[#0F3D3E] text-[#FBF3E7] p-6 flex flex-col items-center justify-center text-center">
        <p className="uppercase tracking-[0.2em] text-[10px] text-[#C99A44] mb-1">{location}</p>
        <p className="text-5xl font-serif">{Math.round(temperature)}°</p>
        <p className="capitalize text-[#FBF3E7]/60 text-sm mt-1">{condition}</p>
      </div>

      {/* Wind */}
      <div className="rounded-xl border border-[#1B1B18]/10 bg-white p-5 flex items-center gap-4">
        <FaWind size={32} className="text-[#C99A44] shrink-0" />
        <div className="text-sm space-y-1">
          <p>Wind speed: <strong>{windSpeed} m/s</strong></p>
          <p>Direction: <strong>{windDirection}°</strong></p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-xl border border-[#1B1B18]/10 bg-white p-5">
        <StatRow icon={<WiHumidity />} label="Humidity" value={`${humidity}%`} />
        <StatRow icon={<WiDaySunnyOvercast />} label="Max Temperature" value={`${maxTemp}°`} />
        <StatRow icon={<WiThermometer />} label="Min Temperature" value={`${minTemp}°`} />
        <StatRow icon="🌡️" label="Feels like" value={`${feelsLike}°`} />
        <StatRow icon={<WiBarometer />} label="Sea Level" value={`${seaLevel} hPa`} />
      </div>

      {/* Visibility */}
      <div className="rounded-xl border border-[#1B1B18]/10 bg-white p-5">
        <h4 className="text-sm font-semibold text-[#1B1B18] mb-3 flex items-center gap-2">
          <FaEye className="text-[#C99A44]" /> Visibility
        </h4>
        <div className="h-1.5 bg-[#1B1B18]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E8674F] rounded-full transition-all"
            style={{ width: `${visibilityPct}%` }}
          />
        </div>
        <p className="text-xs text-[#1B1B18]/50 mt-2">{visibility} km</p>
      </div>
    </div>
  );
};

export default WeatherSection;