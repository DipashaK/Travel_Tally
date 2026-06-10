import React, { useEffect, useState } from "react";
import {
  WiHumidity,
  WiThermometer,
  WiStrongWind,
  WiSnow,
  WiBarometer,
  WiDaySunnyOvercast,
} from "react-icons/wi";
import { FaEye, FaWind } from "react-icons/fa";

const WeatherSection = ({ destination }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination || destination === "Default Destination") {
      setError("Please enter a valid destination.");
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

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch weather data");
        }

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
    return <div className="text-center p-4">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center p-4">No weather data available.</div>;
  }

  const {
    location,
    temperature,
    condition,
    windSpeed,
    windDirection,
    humidity,
    maxTemp,
    minTemp,
    feelsLike,
    seaLevel,
    visibility,
  } = weatherData;

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="rounded-xl shadow p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium">{location}</h3>
          <WiSnow size={40} />
          <p className="text-3xl font-bold">{Math.round(temperature)}°</p>
          <p className="text-gray-500 capitalize">{condition}</p>
        </div>

        <div className="rounded-xl shadow p-4 flex items-center gap-4">
          <FaWind size={48} className="text-green-500" />
          <div>
            <p className="text-sm">
              💨 Wind Speed: <strong>{windSpeed} m/s</strong>
            </p>
            <p className="text-sm">
              🧭 Wind Direction: <strong>{windDirection}°</strong>
            </p>
          </div>
        </div>

        <div className="rounded-xl shadow p-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">
              <WiHumidity /> Humidity
            </span>
            <span>{humidity}%</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">
              <WiDaySunnyOvercast /> Max Temperature
            </span>
            <span>{maxTemp}°</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">
              <WiThermometer /> Min Temperature
            </span>
            <span>{minTemp}°</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">🌡️ Feels like</span>
            <span>{feelsLike}°</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <WiBarometer /> Sea Level
            </span>
            <span>{seaLevel} hPa</span>
          </div>
        </div>

        {/* Card 4: Visibility */}
        <div className="rounded-xl shadow p-4">
          <h4 className="text-md font-semibold mb-2">Visibility</h4>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <FaEye className="text-black" />
            </span>
            <span className="w-full h-1 bg-black mx-2 rounded-full relative">
              <span
                className="absolute top-[-6px] right-0 bg-black h-4 w-4 rounded-full"
                style={{ right: "0" }}
              ></span>
            </span>
            <span>{visibility}km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;
