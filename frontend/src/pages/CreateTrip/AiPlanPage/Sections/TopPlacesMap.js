// import React, { useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Helper component to change map view when center or zoom changes
// function ChangeView({ center, zoom }) {
//   const map = useMap();
//   useEffect(() => {
//     if (center) {
//       map.setView(center, zoom);
//     }
//   }, [center, zoom, map]);
//   return null;
// }

// const TopPlacesMap = ({ places, defaultCenter, defaultPlace, selectedPlace, onSelectPlace }) => {
//   // Find the coordinates of the selected place or default place
//   const getCoordsByName = (name) => {
//     const place = places.find(p => p.name === name);
//     if (place) return [place.lat, place.lon];
//     return null;
//   };

//   const center = selectedPlace
//     ? getCoordsByName(selectedPlace)
//     : getCoordsByName(defaultPlace) || defaultCenter;

//   return (
//     <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
//       <ChangeView center={center} zoom={13} />
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; OpenStreetMap contributors'
//       />

//       {places.map((place) => (
//         <Marker
//           key={place.name}
//           position={[place.lat, place.lon]}
//           eventHandlers={{
//             click: () => onSelectPlace(place.name),
//           }}
//         >
//           <Popup>{place.name}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default TopPlacesMap;



















import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
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

// Change map view when selected place or destination changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Show user’s current location
function UserLocationMarker() {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      const radius = e.accuracy;
      const marker = L.marker(e.latlng).addTo(map);
      marker.bindPopup("📍 You are here").openPopup();

      L.circle(e.latlng, { radius }).addTo(map);
    });
  }, [map]);

  return null;
}

const TopPlacesMap = ({
  places,
  defaultCenter,
  defaultPlace,
  selectedPlace,
  onSelectPlace,
}) => {
  const getCoordsByName = (name) => {
    const place = places.find((p) => p.name === name);
    return place ? [place.lat, place.lon] : null;
  };

  const center =
    selectedPlace
      ? getCoordsByName(selectedPlace)
      : getCoordsByName(defaultPlace) || defaultCenter;

  // Route polyline coordinates
  const routeCoordinates = places.map((p) => [p.lat, p.lon]);

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      <ChangeView center={center} zoom={13} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* Show route lines */}
      {places.length > 1 && (
        <Polyline positions={routeCoordinates} color="blue" />
      )}

      {/* Show markers for each place */}
      {places.map((place) => (
        <Marker
          key={place.name}
          position={[place.lat, place.lon]}
          eventHandlers={{
            click: () => onSelectPlace(place.name),
          }}
        >
          <Popup>
            <div style={{ minWidth: "150px" }}>
              <h3>{place.name}</h3>
              {place.imageUrl && (
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  style={{ width: "100%", borderRadius: "8px", marginTop: "8px" }}
                />
              )}
              {place.description && (
                <p style={{ marginTop: "6px" }}>{place.description}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Show current user location */}
      <UserLocationMarker />
    </MapContainer>
  );
};

export default TopPlacesMap;