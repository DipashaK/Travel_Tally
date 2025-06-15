// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaInfoCircle, FaCloudSun, FaUmbrellaBeach, FaMapMarkerAlt,
//   FaPlane, FaUtensils, FaSuitcase, FaClock, FaMoneyBill,
//   FaUserFriends, FaCog,
// } from "react-icons/fa";

// const Sidebar = ({ scrollToSection, sectionRefs, aiPlan, destination }) => {
//   const navigate = useNavigate();

//  const handleNavigate = (key, ref) => {
//   if (ref && ref.current) {
//     ref.current.scrollIntoView({ behavior: "smooth" });
//   }

//   // Update URL hash with pushState even if it is the same hash to trigger scrolling on reloads
//   if (window.location.pathname !== "/ai-plan" || window.location.hash !== `#${key}`) {
//     navigate(`/ai-plan#${key}`);
//   } else {
//     // If same URL and hash, manually update history to force location.hash change
//     window.history.replaceState(null, "", `/ai-plan#${key}`);
//   }
// };



//   return (
//     <aside className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-gray-100 shadow-lg p-4 overflow-y-auto custom-scroll">
//       <nav className="space-y-4 w-full">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Plan</h3>
//         </div>
//         <ul className="space-y-2 text-gray-700 text-base">
//           {[
//             { label: "About the Place", icon: <FaInfoCircle />, key: "about", ref: sectionRefs?.about },
//             { label: "Weather", icon: <FaCloudSun />, key: "weather", ref: sectionRefs?.weather },
//             { label: "Top Activities", icon: <FaUmbrellaBeach />, key: "activities", ref: sectionRefs?.activities },
//             { label: "Top places to visit", icon: <FaMapMarkerAlt />, key: "places", ref: sectionRefs?.places },
//             { label: "Itinerary", icon: <FaPlane />, key: "itinerary", ref: sectionRefs?.itinerary },
//             { label: "Local Cuisines", icon: <FaUtensils />, key: "cuisines", ref: sectionRefs?.cuisines },
//             { label: "Packing Checklist", icon: <FaSuitcase />, key: "packing", ref: sectionRefs?.packing },
//             { label: "Best time to visit", icon: <FaClock />, key: "bestTime", ref: sectionRefs?.bestTime },
//             { label: "Budget", icon: <FaMoneyBill />, key: "budget", ref: sectionRefs?.budget },
//           ].map(({ label, icon, key, ref }) => (
//             <li
//               key={key}
//               className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1 transition-all duration-200"
//               onClick={() => handleNavigate(key, ref)}
//             >
//               {icon}
//               <span>{label}</span>
//             </li>
//           ))}
//         </ul>

//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Control Center</h3>
//           <ul className="space-y-2 text-gray-700 text-base">
//             <li className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1 transition-all duration-200">
//               <FaMoneyBill />
//               <Link to="/expenses">
//                 <span>Expense Tracker</span>
//               </Link>
//             </li>
//             <li className="flex items-center gap-3 px-2 py-1">
//               <FaUserFriends />
              
//                 <Link to="/collaborate" state={{ aiPlan, destination }} className="hover:text-blue-500 transition-all duration-200">
//                   <span>Collaborate</span>
//                 </Link>
              
//             </li>
//             <li
//               className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1 transition-all duration-200"
//               onClick={() => handleNavigate("settings", sectionRefs.settings)}
//             >
//               <FaCog />
//               <span>Settings</span>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;














// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaInfoCircle, FaCloudSun, FaUmbrellaBeach, FaMapMarkerAlt,
//   FaPlane, FaUtensils, FaSuitcase, FaClock, FaMoneyBill,
//   FaUserFriends, FaCog,
// } from "react-icons/fa";

// const Sidebar = ({ scrollToSection, sectionRefs, aiPlan, destination }) => {
//   const navigate = useNavigate();

//   const handleNavigate = (key, ref) => {
//     if (ref && ref.current) {
//       ref.current.scrollIntoView({ behavior: "smooth" });
//     }

//     // Update URL hash with pushState even if it is the same hash to trigger scrolling on reloads
//     if (window.location.pathname !== "/ai-plan" || window.location.hash !== `#${key}`) {
//       navigate(`/ai-plan#${key}`, { state: { aiPlan, destination } }); // pass state here as well
//     } else {
//       window.history.replaceState(null, "", `/ai-plan#${key}`);
//     }
//   };

//   return (
//     <aside className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-gray-100 shadow-lg p-4 overflow-y-auto custom-scroll">
//       <nav className="space-y-4 w-full">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Plan</h3>
//         </div>
//         <ul className="space-y-2 text-gray-700 text-base">
//           {[
//             { label: "About the Place", icon: <FaInfoCircle />, key: "about", ref: sectionRefs?.about },
//             { label: "Weather", icon: <FaCloudSun />, key: "weather", ref: sectionRefs?.weather },
//             { label: "Top Activities", icon: <FaUmbrellaBeach />, key: "activities", ref: sectionRefs?.activities },
//             { label: "Top places to visit", icon: <FaMapMarkerAlt />, key: "places", ref: sectionRefs?.places },
//             { label: "Itinerary", icon: <FaPlane />, key: "itinerary", ref: sectionRefs?.itinerary },
//             { label: "Local Cuisines", icon: <FaUtensils />, key: "cuisines", ref: sectionRefs?.cuisines },
//             { label: "Packing Checklist", icon: <FaSuitcase />, key: "packing", ref: sectionRefs?.packing },
//             { label: "Best time to visit", icon: <FaClock />, key: "bestTime", ref: sectionRefs?.bestTime },
//             { label: "Budget", icon: <FaMoneyBill />, key: "budget", ref: sectionRefs?.budget },
//           ].map(({ label, icon, key, ref }) => (
//             <li
//               key={key}
//               className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1 transition-all duration-200"
//               onClick={() => handleNavigate(key, ref)}
//             >
//               {icon}
//               <span>{label}</span>
//             </li>
//           ))}
//         </ul>

//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Control Center</h3>
//           <ul className="space-y-2 text-gray-700 text-base">
//             <li className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1 transition-all duration-200">
//               <FaMoneyBill />
//               <Link to="/expenses" state={{ aiPlan, destination }} className="hover:text-blue-500 transition-all duration-200">
//                 <span>Expense Tracker</span>
//               </Link>
//             </li>
//             <li className="flex items-center gap-3 px-2 py-1">
//               <FaUserFriends />
//               <Link to="/collaborate" state={{ aiPlan, destination }} className="hover:text-blue-500 transition-all duration-200">
//                 <span>Collaborate</span>
//               </Link>
//             </li>
//             <li
//               className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1 transition-all duration-200"
//               onClick={() => handleNavigate("settings", sectionRefs.settings)}
//             >
//               <FaCog />
//               <span>Settings</span>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;





















// ResponsiveSidebar.js (updated Sidebar.js)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaCloudSun,
  FaUmbrellaBeach,
  FaMapMarkerAlt,
  FaPlane,
  FaUtensils,
  FaSuitcase,
  FaClock,
  FaMoneyBill,
  FaUserFriends,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ scrollToSection, sectionRefs, aiPlan, destination, planId }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (key, ref) => {
    setIsOpen(false);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    if (window.location.pathname !== "/ai-plan" || window.location.hash !== `#${key}`) {
      navigate(`/ai-plan#${key}`, { state: { aiPlan, destination, planId } });
    } else {
      window.history.replaceState(null, "", `/ai-plan#${key}`);
    }
  };

  const navItems = [
    { label: "About the Place", icon: <FaInfoCircle />, key: "about", ref: sectionRefs?.about },
    { label: "Weather", icon: <FaCloudSun />, key: "weather", ref: sectionRefs?.weather },
    { label: "Top Activities", icon: <FaUmbrellaBeach />, key: "activities", ref: sectionRefs?.activities },
    { label: "Top places to visit", icon: <FaMapMarkerAlt />, key: "places", ref: sectionRefs?.places },
    { label: "Itinerary", icon: <FaPlane />, key: "itinerary", ref: sectionRefs?.itinerary },
    { label: "Local Cuisines", icon: <FaUtensils />, key: "cuisines", ref: sectionRefs?.cuisines },
    { label: "Packing Checklist", icon: <FaSuitcase />, key: "packing", ref: sectionRefs?.packing },
    { label: "Best time to visit", icon: <FaClock />, key: "bestTime", ref: sectionRefs?.bestTime },
    { label: "Budget", icon: <FaMoneyBill />, key: "budget", ref: sectionRefs?.budget },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-purple-600 text-white md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg z-50 transform transition-transform duration-300 p-4 overflow-y-auto custom-scroll
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:block"}`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-xl font-bold">Travel Tally</h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-4 w-full">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Plan</h3>
            <ul className="space-y-2 text-gray-700 text-base">
              {navItems.map(({ label, icon, key, ref }) => (
                <li
                  key={key}
                  className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1"
                  onClick={() => handleNavigate(key, ref)}
                >
                  {icon}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Control Center</h3>
            <ul className="space-y-2 text-gray-700 text-base">
              <li className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1">
                <FaMoneyBill />
                <Link to="/expenses" state={{ aiPlan, destination, planId }} className="hover:text-blue-500">
                  Expense Tracker
                </Link>
              </li>
              <li className="flex items-center gap-3 px-2 py-1">
                <FaUserFriends />
                <Link to="/collaborate" state={{ aiPlan, destination, planId }} className="hover:text-blue-500">
                  Collaborate
                </Link>
              </li>
              <li
                className="flex items-center gap-3 hover:text-blue-500 cursor-pointer px-2 py-1"
                onClick={() => handleNavigate("settings", sectionRefs.settings)}
              >
                <FaCog />
                <span>Settings</span>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
