import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import TravelPlansList from "./TravelPlansList";
import CreatePlanModal from "../CreateTrip/CreatePlanModal/CreatePlanModal";
import "../../index.css";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelPlans, setTravelPlans] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const fetchUserPlans = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "https://travel-tally-3mf9.onrender.com/api/plans/get-plan",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTravelPlans(response.data);
    } catch (error) {
      console.error("Error fetching travel plans:", error);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchUserPlans();
  }, []);

  const handleCardClick = (plan) => {
    navigate(`/ai-plan/${plan._id}`, {
      state: {
        aiPlan: plan.aiPlan,
        destination: plan.destination,
        startDate: plan.startDate,
        endDate: plan.endDate,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--tt-paper)] relative overflow-hidden">
      <Navbar />

      {/* Departure-board style hero */}
      <div className="relative pt-14 pb-8 px-6 text-center overflow-hidden">
        {/* Ambient dotted flight path + traveling plane */}
        <div className="absolute inset-x-0 top-6 h-6 pointer-events-none opacity-70">
          <div
            className="h-px w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--tt-sage) 0 10px, transparent 10px 20px)",
            }}
          />
          <span className="absolute -top-2 text-xl animate-fly" style={{ left: 0 }}>
            ✈️
          </span>
        </div>

        <p className="font-mono-tt text-xs tracking-[0.3em] uppercase text-[var(--tt-teal)]/70 mb-3 animate-fade-in-up">
          Boarding Pass · Dashboard
        </p>
        <h1
          className="font-display text-5xl sm:text-6xl font-semibold text-[var(--tt-ink)] mb-3 animate-fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          Travel Tally <span className="text-[var(--tt-coral)]">🌍</span>
        </h1>
        <p
          className="text-[var(--tt-teal)]/80 text-lg animate-fade-in-up"
          style={{ animationDelay: "160ms" }}
        >
          Every trip, logged like a keepsake ticket stub.
        </p>
      </div>

      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "220ms" }}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>

      <CreatePlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <TravelPlansList
        travelPlans={travelPlans}
        searchQuery={searchQuery}
        onCardClick={handleCardClick}
        loaded={loaded}
      />
    </div>
  );
};

export default Dashboard;