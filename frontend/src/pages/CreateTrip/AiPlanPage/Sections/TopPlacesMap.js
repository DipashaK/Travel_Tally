import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Leaflet icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Utility
const haversineDistance = (coord1, coord2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // km
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Change map view
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const TopPlacesMap = ({
  places,
  defaultCenter,
  defaultPlace,
  selectedPlace,
  onSelectPlace,
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [travelInfo, setTravelInfo] = useState({});
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [customDistance, setCustomDistance] = useState(null);

  const getCoordsByName = (name) => {
    const place = places.find((p) => p.name === name);
    return place ? [place.lat, place.lon] : null;
  };

  const center =
    selectedPlace
      ? getCoordsByName(selectedPlace)
      : getCoordsByName(defaultPlace) || defaultCenter;

  const routeCoordinates = places.map((p) => [p.lat, p.lon]);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
      },
      (err) => console.error("Geolocation error:", err)
    );
  }, []);

  const fetchTravelInfo = async (fromCoords, toCoords, key) => {
    if (!fromCoords || !toCoords) return;

    const body = {
      start: { lat: fromCoords[0], lon: fromCoords[1] },
      end: { lat: toCoords[0], lon: toCoords[1] },
    };

    try {
      const response = await axios.post("http://localhost:5000/api/places/directions", body);
      const seconds = response.data?.features?.[0]?.properties?.summary?.duration || 0;
      const carTime = `${Math.round(seconds / 60)} min`;
      const flightTime = `${Math.round((haversineDistance(fromCoords, toCoords) / 800) * 60)} min`;
      const distance = haversineDistance(fromCoords, toCoords).toFixed(2);

      setTravelInfo((prev) => ({
        ...prev,
        [key]: { carTime, flightTime, distance },
      }));
    } catch (err) {
      console.error("Failed to fetch travel info:", err);
    }
  };

  const handleMarkerClick = (place) => {
    const coords = [place.lat, place.lon];
    onSelectPlace(place.name);

    // Always fetch info from user to selected place
    if (userLocation) {
      fetchTravelInfo(userLocation, coords, place.name);
    }

    // Handle distance between 2 custom places
    if (selectedMarkers.length === 2) {
      setSelectedMarkers([place]);
      setCustomDistance(null);
    } else {
      const updated = [...selectedMarkers, place];
      setSelectedMarkers(updated);

      if (updated.length === 2) {
        const dist = haversineDistance(
          [updated[0].lat, updated[0].lon],
          [updated[1].lat, updated[1].lon]
        ).toFixed(2);
        setCustomDistance(dist);

        const pairKey = `${updated[0].name}-${updated[1].name}`;
        fetchTravelInfo(
          [updated[0].lat, updated[0].lon],
          [updated[1].lat, updated[1].lon],
          pairKey
        );
      }
    }
  };

  const resetSelection = () => {
    setSelectedMarkers([]);
    setCustomDistance(null);
  };

  // ... imports and logic unchanged, only the return JSX changes:

  return (
    <div
      style={{ position: "relative", height: "400px", maxWidth: "1000px" }}
      className="rounded-xl overflow-hidden border border-[#C99A44]/20 shadow-sm"
    >
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <ChangeView center={center} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {places.length > 1 && <Polyline positions={routeCoordinates} color="#E8674F" weight={3} />}

        {places.map((place) => {
          const coords = [place.lat, place.lon];
          const info = travelInfo[place.name];
          return (
            <Marker key={place.name} position={coords} eventHandlers={{ click: () => handleMarkerClick(place) }}>
              <Popup>
                <div style={{ minWidth: "160px", fontFamily: "inherit" }}>
                  <h3 style={{ color: "#0F3D3E", marginBottom: 4 }}>{place.name}</h3>
                  {place.imageUrl && (
                    <img src={place.imageUrl} alt={place.name} style={{ width: "100%", marginTop: 8, borderRadius: 6 }} />
                  )}
                  {place.description && (
                    <p style={{ fontSize: "0.85rem", marginTop: 6, color: "#1B1B18" }}>{place.description}</p>
                  )}
                  {info && (
                    <div style={{ marginTop: 8, fontSize: "0.85rem" }}>
                      <p>🚗 <strong>By Car:</strong> {info.carTime}</p>
                      <p>✈️ <strong>By Flight:</strong> {info.flightTime}</p>
                      <p>📍 <strong>Distance:</strong> {info.distance} km</p>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {userLocation && (
          <>
            <Marker position={userLocation}><Popup>You are here</Popup></Marker>
            <Circle center={userLocation} radius={30} pathOptions={{ color: "#0F3D3E" }} />
          </>
        )}
      </MapContainer>

      {customDistance && selectedMarkers.length === 2 && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-lg shadow px-4 py-2 text-sm z-[1000] border border-[#C99A44]/20">
          📏 <strong>{selectedMarkers[0].name}</strong> ↔ <strong>{selectedMarkers[1].name}</strong>: {customDistance} km
        </div>
      )}

      <button
        className="absolute top-3 right-3 bg-[#0F3D3E] hover:bg-[#0a2d2e] text-[#FBF3E7] px-3 py-1.5 rounded-full text-xs font-medium tracking-wide z-[1000] transition-colors"
        onClick={resetSelection}
      >
        Reset Route
      </button>
    </div>
  );
};

export default TopPlacesMap;