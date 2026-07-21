import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import CardSection from "../CardSection";
import { convertToList, formatItinerary, parseCuisines } from "../utils";
import WeatherSection from "./WeatherSection";
import PackingChecklist from "./PackingCheclist";
import axios from "axios";
import TopPlacesMap from "./TopPlacesMap";
import ReactMarkdown from "react-markdown";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Sections = ({ parsedPlan, sectionRefs, destination }) => {
  const finalDestination = destination || parsedPlan.destination;
  const cuisines = useMemo(() => parseCuisines(parsedPlan.localCuisines), [parsedPlan.localCuisines]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const placesArray = useMemo(() => {
    if (!parsedPlan || !parsedPlan.topPlaces) return [];
    return parsedPlan.topPlaces
      .split(/[\n,]+/)
      .map((p) => p.trim().replace(/\.$/, ""))
      .filter(Boolean);
  }, [parsedPlan?.topPlaces]);

  const [placesWithCoords, setPlacesWithCoords] = useState([]);

  const OPENCAGE_API_KEY = "387116cc2302431590215e21b3e1c0d2";

  useEffect(() => {
    async function fetchCoords() {
      const results = await Promise.all(
        placesArray.map(async (place) => {
          try {
            const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
              params: { key: OPENCAGE_API_KEY, q: `${place}, ${finalDestination}`, limit: 1 },
            });
            if (res.data.results.length > 0) {
              const location = res.data.results[0].geometry;
              return { name: place, lat: location.lat, lon: location.lng };
            }
            console.warn(`No results for: ${place}`);
            return { name: place, lat: null, lon: null };
          } catch (err) {
            console.error(`Error fetching coordinates for ${place}:`, err);
            return { name: place, lat: null, lon: null };
          }
        })
      );
      setPlacesWithCoords(results.filter((p) => p.lat !== null && p.lon !== null));
    }

    if (placesArray.length > 0 && finalDestination) fetchCoords();
  }, [placesArray, finalDestination]);

  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (finalDestination) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: { query: finalDestination, per_page: 1 },
            headers: { Authorization: `Client-ID ynspY4f87MR7fgR-dxJm_Lf2mvXpKWSBIVBamIn28hc` },
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
    return (
      <div className="rounded-xl border border-[#E8674F]/20 bg-[#E8674F]/5 p-6 text-center text-[#E8674F] text-sm">
        Missing destination — can't render this plan.
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <CardSection title="About the Place" eyebrow="Overview" innerRef={sectionRefs.about}>
        {imageUrl && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 bg-[#1B1B18]/5">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#C99A44]/10 via-[#C99A44]/20 to-[#C99A44]/10" />
            )}
            <motion.img
              src={imageUrl}
              alt={`View of ${finalDestination}`}
              onLoad={() => setImageLoaded(true)}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-[#0F3D3E] text-[#1B1B18]/80">
          <ReactMarkdown>{parsedPlan.aboutPlace}</ReactMarkdown>
        </div>
      </CardSection>

      <CardSection title="Weather" eyebrow="Right now" innerRef={sectionRefs.weather}>
        <WeatherSection destination={finalDestination} />
      </CardSection>

      <CardSection title="Top Activities" eyebrow="Don't miss" innerRef={sectionRefs.activities}>
        <ul className="pl-6 space-y-1.5 marker:text-[#C99A44]">
          {convertToList(parsedPlan.topActivities, "🎯")}
        </ul>
      </CardSection>

      <CardSection title="Top Places to Visit" eyebrow="On the map" innerRef={sectionRefs.places}>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-64 md:max-h-[400px] overflow-y-auto">
            <ol className="space-y-1.5">
              {placesWithCoords.map((place, i) => {
                const active = selectedPlace === place.name;
                return (
                  <motion.li
                    key={place.name}
                    onClick={() => setSelectedPlace(place.name)}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm border-l-2 transition-colors
                      ${active
                        ? "border-[#E8674F] bg-[#E8674F]/5 text-[#0F3D3E] font-semibold"
                        : "border-transparent text-[#1B1B18]/70 hover:bg-[#1B1B18]/[0.03]"
                      }`}
                  >
                    <span className="text-xs text-[#C99A44] font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {place.name}
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <div className="flex-1 w-full h-[400px]">
            <TopPlacesMap
              places={placesWithCoords}
              defaultCenter={[29.533, 75.02]}
              defaultPlace={finalDestination}
              selectedPlace={selectedPlace}
              onSelectPlace={setSelectedPlace}
            />
          </div>
        </div>
      </CardSection>

      <CardSection title="Itinerary" eyebrow="Day by day" innerRef={sectionRefs.itinerary}>
        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-[#0F3D3E]">
          {formatItinerary(parsedPlan.itinerary)}
        </div>
      </CardSection>

      <CardSection title="Local Cuisines" eyebrow="Taste of the trip" innerRef={sectionRefs.cuisines}>
        <div className="grid sm:grid-cols-2 gap-4">
          {cuisines.map((dish, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-4 rounded-xl border border-[#C99A44]/20 bg-[#FBF3E7] shadow-sm"
            >
              <h4 className="font-serif text-lg text-[#0F3D3E] mb-1.5">🍽️ {dish.name}</h4>
              <p className="text-sm text-[#1B1B18]/70 mb-3">{dish.description}</p>
              <p className="text-xs uppercase tracking-wider text-[#C99A44] font-semibold mb-1.5">
                Popular places
              </p>
              <ul className="space-y-1 text-sm">
                {dish.places.map((place, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#E8674F] mt-0.5">★</span>
                    <span>
                      <strong>{place.name}</strong>, {place.area} — {place.reason}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CardSection>

      <CardSection title="Packing Checklist" eyebrow="Before you go" innerRef={sectionRefs.packing}>
        <PackingChecklist
          items={
            Array.isArray(parsedPlan.packingChecklist)
              ? parsedPlan.packingChecklist
              : (parsedPlan.packingChecklist || "").split("\n")
          }
          destination={finalDestination}
        />
      </CardSection>

      <CardSection title="Best Time to Visit" eyebrow="Plan around this" innerRef={sectionRefs.bestTime}>
        <ul className="pl-6 space-y-1.5 marker:text-[#C99A44]">
          {convertToList(parsedPlan.bestTimeToVisit, "🕒")}
        </ul>
      </CardSection>

      <CardSection title="Budget" eyebrow="Estimated cost" innerRef={sectionRefs.budget}>
        <ul className="pl-6 space-y-1.5 marker:text-[#C99A44]">
          {convertToList(parsedPlan.budget, "💸")}
        </ul>
      </CardSection>
    </motion.div>
  );
};

export default Sections;