// import React from "react";
// import Navbar from "../components/main/Navbar";
// import HeroSection from "../sections/HeroSection";
// import HowItWorks from "../sections/HowItWorks";
// import CommunityTrips from "../sections/CommunityTrips";
// import HorizontalLine from "../components/ui/HorizontalLine";

// const LandingPage = () => {
//   return (
//     <div>
//       <Navbar />
//       <HeroSection />
//       <HorizontalLine/>
//       <HowItWorks />
//       <HorizontalLine/>
//       <CommunityTrips />
//     </div>
//   );
// };

// export default LandingPage;




















import React from "react";
import Navbar from "../components/main/Navbar";
import HeroSection from "../sections/HeroSection";
import HowItWorks from "../sections/HowItWorks";
import CommunityTrips from "../sections/CommunityTrips";
import HorizontalLine from "../components/ui/HorizontalLine";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-100 text-gray-900 font-sans">
      <Navbar />

      <section className="relative z-0">
        <HeroSection />
      </section>

      <HorizontalLine />

      <section className="relative z-10">
        <HowItWorks />
      </section>

      <HorizontalLine />

      <section className="relative z-20">
        <CommunityTrips />
      </section>

      <section className="bg-white py-16 text-center px-6">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Join Our Newsletter</h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Stay up to date with our latest travel features, community stories, and AI-powered planning tips.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-96"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:scale-105 hover:shadow-xl transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Travel Tally. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
