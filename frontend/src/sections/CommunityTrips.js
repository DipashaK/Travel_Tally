// import React from "react";
// import singapore from "../assets/images/bali.jpg";
// import london from "../assets/images/europe.jpg";
// import cherrapunji from "../assets/images/hyderabad.jpg";
// import philadelphia from "../assets/images/bali.jpg";
// import lucknow from "../assets/images/europe.jpg";
// import vrindavan from "../assets/images/hyderabad.jpg";
// import ooty from "../assets/images/bali.jpg";
// import amsterdam from "../assets/images/europe.jpg";

// const trips = [
//   { name: "Singapore", image: singapore },
//   { name: "London", image: london },
//   { name: "Cherrapunji, India", image: cherrapunji },
//   { name: "Philadelphia, PA", image: philadelphia },
//   { name: "Lucknow, India", image: lucknow },
//   { name: "Vrindavan, India", image: vrindavan },
//   { name: "Ooty, India", image: ooty },
//   { name: "Amsterdam, Netherlands", image: amsterdam },
// ];

// const CommunityTrips = () => {
//   return (
//     <section className="py-12 bg-white">
//       <h2 className="text-4xl font-bold text-center text-blue-600">
//         Our Community's Favorite Trips
//       </h2>
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
//         {trips.map((trip, index) => (
//           <div
//             key={index}
//             className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
//             onClick={() => alert(`Showing details for ${trip.name}`)}
//           >
//             <img
//               src={trip.image}
//               alt={trip.name}
//               className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//               <h3 className="text-white font-semibold">{trip.name}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CommunityTrips;




















import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import singapore from "../assets/images/bali.jpg";
import london from "../assets/images/europe.jpg";
import cherrapunji from "../assets/images/hyderabad.jpg";
import philadelphia from "../assets/images/bali.jpg";
import lucknow from "../assets/images/europe.jpg";
import vrindavan from "../assets/images/hyderabad.jpg";
import ooty from "../assets/images/bali.jpg";
import amsterdam from "../assets/images/europe.jpg";

const trips = [
  { name: "Singapore", image: singapore },
  { name: "London", image: london },
  { name: "Cherrapunji, India", image: cherrapunji },
  { name: "Philadelphia, PA", image: philadelphia },
  { name: "Lucknow, India", image: lucknow },
  { name: "Vrindavan, India", image: vrindavan },
  { name: "Ooty, India", image: ooty },
  { name: "Amsterdam, Netherlands", image: amsterdam },
];

const CommunityTrips = () => {
  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="py-16 bg-white">
      <h2
        data-aos="fade-up"
        className="text-4xl font-bold text-center text-blue-600 mb-10"
      >
        Our Community's Favorite Trips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {trips.map((trip, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            className="relative rounded-xl overflow-hidden shadow-lg group transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => alert(`Showing details for ${trip.name}`)}
          >
            <img
              src={trip.image}
              alt={trip.name}
              className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">
                {trip.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityTrips;
