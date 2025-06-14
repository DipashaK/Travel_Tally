// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import SearchBar from "./SearchBar";
// import TravelPlansList from "./TravelPlansList";
// import CreatePlanModal from "../CreateTrip/CreatePlanModal/CreatePlanModal";

// const Dashboard = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [travelPlans, setTravelPlans] = useState([]);

//   const navigate = useNavigate();

//   const fetchUserPlans = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/plans/get-plan", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTravelPlans(response.data);
//     } catch (error) {
//       console.error("Error fetching travel plans:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserPlans();
//   }, []);

//   const handleCardClick = (plan) => {
//     navigate(`/ai-plan/${plan._id}`, { 
//       state: { 
//         aiPlan: plan.aiPlan, 
//         destination: plan.destination, 
//         startDate: plan.startDate, 
//         endDate: plan.endDate 
//       } 
//     });
//   };
  
  
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <SearchBar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         onOpenModal={() => setIsModalOpen(true)}
//       />
//       <CreatePlanModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//       <TravelPlansList
//         travelPlans={travelPlans}
//         searchQuery={searchQuery}
//         onCardClick={handleCardClick}
//       />
//     </div>
//   );
// };

// export default Dashboard;














// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import TravelPlansList from "./TravelPlansList";
import CreatePlanModal from "../CreateTrip/CreatePlanModal/CreatePlanModal";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelPlans, setTravelPlans] = useState([]);

  const navigate = useNavigate();

  const fetchUserPlans = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/plans/get-plan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTravelPlans(response.data);
    } catch (error) {
      console.error("Error fetching travel plans:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />

      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome to Travel Tally 🌍</h1>
        <p className="text-gray-600">Track and manage all your exciting adventures</p>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <CreatePlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <TravelPlansList
        travelPlans={travelPlans}
        searchQuery={searchQuery}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default Dashboard;