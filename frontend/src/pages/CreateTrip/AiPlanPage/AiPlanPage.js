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

  const [aiPlan, setAiPlan] = useState(null);
  const [destination, setDestination] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.state?.aiPlan && location.state?.destination) {
      setAiPlan(location.state.aiPlan);
      setDestination(location.state.destination);
      setPlanId(location.state.aiPlan._id);
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          aiPlan: location.state.aiPlan,
          destination: location.state.destination,
          planId: location.state.aiPlan._id,
        }),
      );
    } else {
      const savedData = sessionStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const { aiPlan, destination, planId } = JSON.parse(savedData);
        setAiPlan(aiPlan);
        setDestination(destination);
        setPlanId(planId);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (aiPlan && destination && planId) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ aiPlan, destination, planId }),
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

  const parsedPlan = parseAiPlan(aiPlan, destination);

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1);
      if (sectionRefs[hash]?.current) {
        sectionRefs[hash].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.key, location.hash]);

  // ---- Empty / loading state, styled like a departure board ----
  if (!aiPlan || !destination) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0F3D3E]">
        <Header />
        <div className="flex flex-1 justify-center items-center p-8">
          <div className="relative max-w-md w-full bg-[#FBF3E7] rounded-xl shadow-2xl p-8 text-center border border-[#C99A44]/30">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-[#0F3D3E]" />
            <p className="uppercase tracking-[0.2em] text-xs text-[#C99A44] font-semibold mb-3">
              {!aiPlan ? "Gate pending" : "Missing destination"}
            </p>
            <h2 className="font-serif text-2xl text-[#1B1B18] mb-6">
              {!aiPlan
                ? "Your itinerary hasn't boarded yet"
                : "We don't know where you're headed"}
            </h2>
            <p className="text-sm text-[#1B1B18]/60 mb-6">
              {!aiPlan
                ? "Head back and generate a plan to see it appear here."
                : "This plan is missing a destination — try creating a new one."}
            </p>
            <button
              className="px-6 py-2.5 bg-[#E8674F] hover:bg-[#d8593f] transition-colors text-white rounded-full font-medium tracking-wide"
              onClick={() => navigate("/")}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF3E7] min-h-screen">
      <Header />
      <div className="flex pt-16">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[#0F3D3E] text-[#FBF3E7] h-11 w-11 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sectionRefs={sectionRefs}
          aiPlan={aiPlan}
          destination={destination}
          planId={planId}
        />

        {/* Main content */}
        <main className="flex-1 md:ml-64 px-4 md:px-8 py-6">
          {/* Signature: boarding-pass hero */}
          <div className="relative mb-8 overflow-hidden rounded-2xl bg-[#0F3D3E] text-[#FBF3E7] shadow-xl">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(251,243,231,0.4) 18px, rgba(251,243,231,0.4) 19px)",
              }}
            />
            <div className="relative flex items-center justify-between px-6 py-8 md:px-10">
              <div>
                <p className="uppercase tracking-[0.25em] text-xs text-[#C99A44] font-semibold mb-2">
                  Your trip to
                </p>
                <h1 className="font-serif text-3xl md:text-5xl leading-tight">
                  {destination?.name || destination}
                </h1>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right text-xs uppercase tracking-widest text-[#FBF3E7]/70">
                <span>Plan</span>
                <span className="font-mono text-[#C99A44]">
                  #{String(planId).slice(-6)}
                </span>
              </div>
            </div>
            {/* Perforated edge */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="h-4 w-4 rounded-full bg-[#FBF3E7]"
                />
              ))}
            </div>
          </div>

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