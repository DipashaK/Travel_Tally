import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AiPlanPage from "./pages/CreateTrip/AiPlanPage/AiPlanPage";
import SignUpPage from "./pages/LoginSignUp/SignUpPage"; 
import ExpenseTracker from "./pages/ExpenseTracker/ExpenseTracker";
import CreatePlanPage from "./pages/CreateTrip/CreatePlanModal/CreateYourPlanPage"; // ✅ New Import
import Collaborators from "./pages/Collaborator";
import JoinPlanPage from "./pages/JoinPlanPage";
import PlanDetailsPage from "./PlanDetailsPage";
import "leaflet/dist/leaflet.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-plan" element={<AiPlanPage />} />
        <Route path="/ai-plan/:planId" element={<AiPlanPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/create-plan" element={<CreatePlanPage />} /> {/* ✅ New Route */}
        <Route path="/expenses" element={<ExpenseTracker />} />
        <Route path="/collaborate" element={<Collaborators />} />
        <Route path="/join-plan" element={<JoinPlanPage />} />
         <Route path="/plan/:planId" element={<PlanDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;