

// import React, { useRef, useState } from "react";
// import Sidebar from "../../CreateTrip/AiPlanPage/Sidebar";
// import Header from "../../../common/Header";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const CreateYourPlanPage = () => {
//   const aboutRef = useRef(null);
//   const weatherRef = useRef(null);
//   const activitiesRef = useRef(null);
//   const placesRef = useRef(null);
//   const itineraryRef = useRef(null);
//   const cuisinesRef = useRef(null);
//   const packingRef = useRef(null);
//   const bestTimeRef = useRef(null);
//   const collaborateRef = useRef(null);
//   const settingsRef = useRef(null);

//   const sectionRefs = {
//     about: aboutRef,
//     weather: weatherRef,
//     activities: activitiesRef,
//     places: placesRef,
//     itinerary: itineraryRef,
//     cuisines: cuisinesRef,
//     packing: packingRef,
//     bestTime: bestTimeRef,
//     collaborate: collaborateRef,
//     settings: settingsRef,
//   };

//   const initialSectionData = {
//     about: "Details about the location, history, culture, and background.",
//     weather: "Typical weather patterns and what to expect during your visit.",
//     activities: "Exciting things to do while you’re there.",
//     places: "Must-see sights and attractions.",
//     itinerary: "Plan your daily schedule and travel flow.",
//     cuisines: "Taste the local flavors and dishes.",
//     packing: "Don’t forget these essentials for your trip.",
//     bestTime: "Seasonal tips and advice for timing your travel.",
//   };

//   const [sectionContent, setSectionContent] = useState(initialSectionData);
//   const [editMode, setEditMode] = useState({});

//   const scrollToSection = (ref) => {
//     if (ref && ref.current) {
//       ref.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleEditClick = (key) => {
//     setEditMode((prev) => ({ ...prev, [key]: true }));
//     setSectionContent((prev) => ({
//       ...prev,
//       [key]: "", // Clear content for editing
//     }));
//   };

//   const handleChange = (key, value) => {
//     setSectionContent((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleDeleteClick = (key) => {
//     setSectionContent((prev) => ({
//       ...prev,
//       [key]: "",
//     }));
//     setEditMode((prev) => ({ ...prev, [key]: false }));
//   };

//   return (
//     <div className="flex flex-col">
//       <Header />
//       <div className="flex">
//         <Sidebar scrollToSection={scrollToSection} sectionRefs={sectionRefs} />

//         {/* Main content area: add top padding to prevent header overlap */}
//         <main className="ml-56 p-6 pt-24 flex-1 space-y-16">
//           {Object.keys(initialSectionData).map((key) => (
//             <section
//               key={key}
//               ref={sectionRefs[key]}
//               className="p-4 border rounded shadow relative scroll-mt-24"
//             >
//               <div className="flex justify-between items-start">
//                 <h2 className="text-2xl font-bold mb-3 capitalize text-blue-600">
//                   {key === "bestTime"
//                     ? "Best Time to Visit"
//                     : key.charAt(0).toUpperCase() +
//                       key.slice(1).replace(/([A-Z])/g, " $1")}
//                 </h2>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleEditClick(key)}
//                     className="bg-transparent text-blue-600 hover:text-blue-800"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteClick(key)}
//                     className="bg-transparent text-red-600 hover:text-red-800"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>

//               {editMode[key] ? (
//                 <textarea
//                   className="w-full mt-2 p-2 border rounded"
//                   value={sectionContent[key]}
//                   onChange={(e) => handleChange(key, e.target.value)}
//                   placeholder={`Enter content for ${key}...`}
//                   rows={4}
//                 />
//               ) : (
//                 <p className="mt-2">{sectionContent[key]}</p>
//               )}
//             </section>
//           ))}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CreateYourPlanPage;


import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar2"; // ✅ Make sure it's the generic Sidebar
import Header from "../../../common/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

const CreateYourPlanPage = () => {
  const aboutRef = useRef(null);
  const weatherRef = useRef(null);
  const activitiesRef = useRef(null);
  const placesRef = useRef(null);
  const itineraryRef = useRef(null);
  const cuisinesRef = useRef(null);
  const packingRef = useRef(null);
  const bestTimeRef = useRef(null);
  const collaborateRef = useRef(null);
  const settingsRef = useRef(null);

  const sectionRefs = {
    about: aboutRef,
    weather: weatherRef,
    activities: activitiesRef,
    places: placesRef,
    itinerary: itineraryRef,
    cuisines: cuisinesRef,
    packing: packingRef,
    bestTime: bestTimeRef,
    collaborate: collaborateRef,
    settings: settingsRef,
  };

  const initialSectionData = {
    about: "Details about the location, history, culture, and background.",
    weather: "Typical weather patterns and what to expect during your visit.",
    activities: "Exciting things to do while you’re there.",
    places: "Must-see sights and attractions.",
    itinerary: "Plan your daily schedule and travel flow.",
    cuisines: "Taste the local flavors and dishes.",
    packing: "Don’t forget these essentials for your trip.",
    bestTime: "Seasonal tips and advice for timing your travel.",
    // collaborate: "Collaborate with others to plan this trip.",
    // settings: "Trip settings and preferences.",
  };

  const [sectionContent, setSectionContent] = useState(initialSectionData);
  const [editMode, setEditMode] = useState({});
  const [touched, setTouched] = useState({}); // Track if user has edited before

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditClick = (key) => {
    setSectionContent((prev) => ({
      ...prev,
      [key]: touched[key] ? prev[key] : "", // clear default text only first time
    }));
    setEditMode((prev) => ({ ...prev, [key]: true }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleChange = (key, value) => {
    setSectionContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteClick = (key) => {
    setSectionContent((prev) => ({
      ...prev,
      [key]: "",
    }));
    setEditMode((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar scrollToSection={scrollToSection} sectionRefs={sectionRefs} />

        <main className="ml-56 p-6 pt-[80px] flex-1 space-y-16">
          {Object.keys(initialSectionData).map((key) => (
            <section
              key={key}
              ref={sectionRefs[key]}
              className="p-4 border rounded shadow relative"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl mb-3 capitalize text-blue-700">
                  {key === "bestTime"
                    ? "Best Time to Visit"
                    : key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")}
                </h2>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(key)}
                    className="bg-transparent text-blue-600 hover:text-blue-800"
                    aria-label={`Edit ${key} section`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(key)}
                    className="bg-transparent text-red-600 hover:text-red-800"
                    aria-label={`Delete ${key} section content`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {editMode[key] ? (
                <textarea
                  className="w-full mt-2 p-2 border rounded"
                  value={sectionContent[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={`Enter content for ${key}...`}
                  rows={4}
                  onBlur={() => setEditMode((prev) => ({ ...prev, [key]: false }))}
                />
              ) : (
                <p className="mt-2 whitespace-pre-line">
                  {sectionContent[key] || (
                    <span className="text-gray-400 italic">No content provided.</span>
                  )}
                </p>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default CreateYourPlanPage;
