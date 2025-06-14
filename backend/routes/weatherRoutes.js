// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// router.get("/get-weather", async (req, res) => {
//   const { destination } = req.query;

//   if (!destination) {
//     return res.status(400).json({ error: "Destination is required" });
//   }

//   try {
//     const apiKey = process.env.WEATHER_API_KEY;
//     const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${apiKey}`;

//     const response = await axios.get(weatherApiUrl);

//     const data = response.data;

//     const weatherData = {
//       location: data.name,
//       temperature: data.main.temp,
//       condition: data.weather[0].description,
//       windSpeed: data.wind.speed,
//       windDirection: data.wind.deg,
//       humidity: data.main.humidity,
//       maxTemp: data.main.temp_max,
//       minTemp: data.main.temp_min,
//       feelsLike: data.main.feels_like,
//       seaLevel: data.main.pressure,
//       visibility: data.visibility / 1000, 
//     };

//     res.json(weatherData);
//   } catch (error) {
//     console.error("Error fetching weather:", error.response?.data || error);
//     res.status(500).json({ error: "Failed to fetch weather data" });
//   }
// });

// module.exports = router;



















const express = require("express");
const axios = require("axios");
const router = express.Router();


router.get("/get-weather", async (req, res) => {
   const destination = req.query.destination;
   console.log(req.query);  // This will log all query parameters sent to the server.

  if (!destination) {
    return res.status(400).send({ error: "Destination is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${apiKey}`;

    const response = await axios.get(weatherApiUrl);
    const data = response.data;

    const weatherData = {
      location: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      humidity: data.main.humidity,
      maxTemp: data.main.temp_max,
      minTemp: data.main.temp_min,
      feelsLike: data.main.feels_like,
      seaLevel: data.main.pressure,
      visibility: data.visibility / 1000,
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error.response?.data || error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;