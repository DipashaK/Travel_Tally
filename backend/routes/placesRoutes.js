const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/directions", async (req, res) => {
  try {
    const { start, end } = req.body;

    if (!start || !end || !start.lat || !start.lon || !end.lat || !end.lon) {
      console.error("Invalid request body:", req.body);
      return res.status(400).json({ error: "Missing or invalid coordinates" });
    }

    const data = {
      coordinates: [
        [start.lon, start.lat],
        [end.lon, end.lat],
      ],
    };
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      data,
      {
        headers: {
          Authorization: process.env.ORS_API_KEY || "YOUR_API_KEY",
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("ORS Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to fetch directions",
      details: err.response?.data || err.message,
    });
  }
});

module.exports = router;
