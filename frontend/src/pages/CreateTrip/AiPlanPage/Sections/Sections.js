import React, { useEffect, useState, useMemo } from "react";
import CardSection from "../CardSection";
import { convertToList, formatItinerary } from "../utils";
import WeatherSection from "./WeatherSection";
import PackingChecklist from "./PackingCheclist";
import axios from "axios";
import TopPlacesMap from "./TopPlacesMap";

const Sections = ({ parsedPlan, sectionRefs, destination }) => {
  const finalDestination = destination || parsedPlan.destination;
  const [imageUrl, setImageUrl] = useState(null);

  const placesArray = useMemo(() => {
    if (!parsedPlan || !parsedPlan.topPlaces) return [];
    return parsedPlan.topPlaces
      .split(/[\n,]+/)
      .map((p) => p.trim().replace(/\.$/, ""))
      .filter(Boolean);
  }, [parsedPlan?.topPlaces]);

  const [placesWithCoords, setPlacesWithCoords] = useState([]);

  // ✅ Replace this with your OpenCage API Key
  const OPENCAGE_API_KEY = "387116cc2302431590215e21b3e1c0d2";

  useEffect(() => {
    async function fetchCoords() {
      const results = await Promise.all(
        placesArray.map(async (place) => {
          try {
            const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
              params: {
                key: OPENCAGE_API_KEY,
                q: `${place}, ${finalDestination}`,
                limit: 1,
              },
            });

            if (res.data.results.length > 0) {
              const location = res.data.results[0].geometry;
              return {
                name: place,
                lat: location.lat,
                lon: location.lng,
              };
            } else {
              console.warn(`No results for: ${place}`);
              return { name: place, lat: null, lon: null };
            }
          } catch (err) {
            console.error(`Error fetching coordinates for ${place}:`, err);
            return { name: place, lat: null, lon: null };
          }
        })
      );

      setPlacesWithCoords(results.filter((p) => p.lat !== null && p.lon !== null));
    }

    if (placesArray.length > 0 && finalDestination) {
      fetchCoords();
    }
  }, [placesArray, finalDestination]);

  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (finalDestination) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: { query: finalDestination, per_page: 1 },
            headers: {
              Authorization: `Client-ID ynspY4f87MR7fgR-dxJm_Lf2mvXpKWSBIVBamIn28hc`,
            },
          });

          if (response.data.results.length > 0) {
            setImageUrl(response.data.results[0].urls.regular);
          }
        } catch (error) {
          console.error("Image fetch error:", error);
        }
      };

      fetchImage();
    }
  }, [finalDestination]);

  if (!finalDestination) {
    console.error("Destination is missing!");
    return <h2>Error: Missing destination!</h2>;
  }

  return (
    <>
      <CardSection title="About the Place" innerRef={sectionRefs.about}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`View of ${finalDestination}`}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
        )}
        <ul className="list-disc pl-6">
          {convertToList(parsedPlan.aboutPlace, "📍")}
        </ul>
      </CardSection>

      <CardSection title="Weather" innerRef={sectionRefs.weather}>
        <WeatherSection destination={finalDestination} />
      </CardSection>

      <CardSection title="Top Activities" innerRef={sectionRefs.activities}>
        <ul className="pl-6">
          {convertToList(parsedPlan.topActivities, "🎯")}
        </ul>
      </CardSection>

      <CardSection title="Top Places to Visit" innerRef={sectionRefs.places}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <div style={{ flex: 1, maxWidth: "300px", overflowY: "auto", maxHeight: "400px", marginTop: "30px" }}>
            <ul className="list-decimal pl-6">
              {placesWithCoords.map((place) => (
                <li
                  key={place.name}
                  style={{
                    cursor: "pointer",
                    marginBottom: "0.5rem",
                    fontWeight: selectedPlace === place.name ? "bold" : "normal",
                    color: selectedPlace === place.name ? "#007bff" : "inherit",
                  }}
                  onClick={() => setSelectedPlace(place.name)}
                >
                  {place.name}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 2, height: "400px" }}>
            <TopPlacesMap
              places={placesWithCoords}
              defaultCenter={[29.533, 75.020]}
              defaultPlace={finalDestination}
              selectedPlace={selectedPlace}
              onSelectPlace={setSelectedPlace}
            />
          </div>
        </div>
      </CardSection>

      <CardSection title="Itinerary" innerRef={sectionRefs.itinerary}>
        {formatItinerary(parsedPlan.itinerary)}
      </CardSection>

      <CardSection title="Local Cuisines" innerRef={sectionRefs.cuisines}>
        <ul className="list-disc pl-6">
          {convertToList(parsedPlan.localCuisines, "🍽️")}
        </ul>
      </CardSection>

      <CardSection title="Packing Checklist" innerRef={sectionRefs.packing}>
        <PackingChecklist
          items={
            Array.isArray(parsedPlan.packingChecklist)
              ? parsedPlan.packingChecklist
              : (parsedPlan.packingChecklist || "").split("\n")
          }
          destination={finalDestination}
        />
      </CardSection>

      <CardSection title="Best Time to Visit" innerRef={sectionRefs.bestTime}>
        <ul className="list-disc pl-6">
          {convertToList(parsedPlan.bestTimeToVisit, "🕒")}
        </ul>
      </CardSection>

      <CardSection title="Budget" innerRef={sectionRefs.budget}>
        <ul className="list-disc pl-6">
          {convertToList(parsedPlan.budget, "💸")}
        </ul>
      </CardSection>
    </>
  );
};

export default Sections;