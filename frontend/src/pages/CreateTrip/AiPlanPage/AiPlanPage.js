import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../../../common/Header";
import Sections from "./Sections/Sections";
import { parseAiPlan } from "./utils";

const STORAGE_KEY = "savedAiPlanData";

const AiPlanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state as null, we'll update it from location or sessionStorage in useEffect
  const [aiPlan, setAiPlan] = useState(null);
  const [destination, setDestination] = useState(null);
  const [planId, setPlanId] = useState(null);

  // Sync state with location.state when it changes (e.g. when user switches plans)
  useEffect(() => {
    if (location.state?.aiPlan && location.state?.destination) {
      setAiPlan(location.state.aiPlan);
      setDestination(location.state.destination);
      setPlanId(location.state.aiPlan._id);
      // Save to sessionStorage as well
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          aiPlan: location.state.aiPlan,
          destination: location.state.destination,
          planId: location.state.aiPlan._id,
        })
      );
    } else {
      // If location.state missing (e.g. user refresh), fallback to sessionStorage
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const { aiPlan, destination, planId } = JSON.parse(savedData);
        setAiPlan(aiPlan);
        setDestination(destination);
        setPlanId(planId);
      }
    }
  }, [location.state]);

  // Keep sessionStorage updated if aiPlan/destination/planId changes (just in case)
  useEffect(() => {
    if (aiPlan && destination && planId) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ aiPlan, destination, planId })
      );
    }
  }, [aiPlan, destination, planId]);

  const sectionRefs = {
    about: useRef(null),
    weather: useRef(null),
    activities: useRef(null),
    places: useRef(null),
    itinerary: useRef(null),
    cuisines: useRef(null),
    packing: useRef(null),
    bestTime: useRef(null),
    budget: useRef(null),
    settings: useRef(null),
  };

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const parsedPlan = parseAiPlan(aiPlan, destination);

  // Scroll to section on location.hash change
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1);
      if (sectionRefs[hash]?.current) {
        sectionRefs[hash].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.key, location.hash]);

  if (!aiPlan || !destination) {
    return (
      <div className="flex flex-col min-h-screen bg-purple-100">
        <Header />
        <div className="flex flex-1 justify-center items-center p-8">
          <h2>
            {!aiPlan
              ? "Loading AI Plan... Please navigate from the home page."
              : "Destination is missing!"}
          </h2>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-purple-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          scrollToSection={scrollToSection}
          sectionRefs={sectionRefs}
          aiPlan={aiPlan}
          destination={destination}
          planId={planId}
        />
        <main className="ml-56 p-8 bg-gray-50 min-h-screen overflow-y-auto">
          <Sections
            parsedPlan={parsedPlan}
            sectionRefs={sectionRefs}
            destination={destination}
          />
        </main>
      </div>
    </div>
  );
};

export default AiPlanPage;
