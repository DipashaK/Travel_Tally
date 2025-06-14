// // Sidebar.js
// import React from "react";

// const Sidebar = ({ scrollToSection, sectionRefs }) => {
//   const sections = [
//     { key: "about", label: "About the Place" },
//     { key: "weather", label: "Weather" },
//     { key: "activities", label: "Activities" },
//     { key: "places", label: "Places to Visit" },
//     { key: "itinerary", label: "Itinerary" },
//     { key: "cuisines", label: "Cuisines" },
//     { key: "packing", label: "Packing Checklist" },
//     { key: "bestTime", label: "Best Time to Visit" },
//     { key: "collaborate", label: "Collaborate" },
//     { key: "settings", label: "Settings" },
//   ];

//   return (
//     <aside className="fixed top-16 left-0 w-56 h-full bg-gray-100 p-4 overflow-y-auto">
//       <nav>
//         <ul className="space-y-2">
//           {sections.map(({ key, label }) => (
//             <li key={key}>
//               <button
//                 className="text-left w-full px-2 py-1 hover:bg-black-200 rounded text-black-700 font-semibold"
//                 onClick={() => scrollToSection(sectionRefs[key])}
//               >
//                 {label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


// Sidebar.js

// Sidebar.js


import React from "react";
import {
  FaInfoCircle, FaCloudSun, FaUmbrellaBeach, FaMapMarkerAlt,
  FaPlane, FaUtensils, FaSuitcase, FaClock,
  FaUserFriends, FaCog
} from "react-icons/fa";

const Sidebar = ({ scrollToSection, sectionRefs }) => {
  const sections = [
    { key: "about", label: "About the Place", icon: <FaInfoCircle /> },
    { key: "weather", label: "Weather", icon: <FaCloudSun /> },
    { key: "activities", label: "Activities", icon: <FaUmbrellaBeach /> },
    { key: "places", label: "Places to Visit", icon: <FaMapMarkerAlt /> },
    { key: "itinerary", label: "Itinerary", icon: <FaPlane /> },
    { key: "cuisines", label: "Cuisines", icon: <FaUtensils /> },
    { key: "packing", label: "Packing Checklist", icon: <FaSuitcase /> },
    { key: "bestTime", label: "Best Time to Visit", icon: <FaClock /> },
    { key: "collaborate", label: "Collaborate", icon: <FaUserFriends /> },
    { key: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <aside className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-gray-100 shadow-lg p-4 overflow-y-auto custom-scroll">
      <nav className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Plan</h3>
          <ul className="space-y-2 text-gray-700 text-base">
            {sections.slice(0, 8).map(({ key, label, icon }) => (
              <li key={key}>
                <button
                  className="flex items-center gap-3 text-left w-full px-3 py-2 rounded hover:bg-gray-200 transition-all duration-200 font-medium"
                  onClick={() => scrollToSection(sectionRefs[key])}
                >
                  {icon}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Control Center</h3>
          <ul className="space-y-2 text-gray-700 text-base">
            {sections.slice(8).map(({ key, label, icon }) => (
              <li key={key}>
                <button
                  className="flex items-center gap-3 text-left w-full px-3 py-2 rounded hover:bg-gray-200 transition-all duration-200 font-medium"
                  onClick={() => scrollToSection(sectionRefs[key])}
                >
                  {icon}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
