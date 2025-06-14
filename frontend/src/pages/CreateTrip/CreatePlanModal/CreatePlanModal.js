import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationInput from "./DestinationInput";
import DateSelector from "./DateSelector";
import ActivitySelector from "./ActivitySelector";
import GroupSelector from "./GroupSelector";
import BudgetSelector from "./BudgetSelector";
import PlanButtons from "./PlanButtons";
import AIPlanDisplay from "./AIPlanDisplay";

const CreatePlanModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [aiPlan, setAiPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const generateAIPlan = async () => {
  setLoading(true);
  setAiPlan("");

  try {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/plans/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        destination,
        startDate,
        endDate,
        selectedActivities,
        selectedGroup,
        budget,
      }),
    });

    const data = await response.json();

    if (data.aiPlan && data.planId) {
      setAiPlan(data.aiPlan);

      // ✅ Store in sessionStorage if needed later
      sessionStorage.setItem("planId", data.planId);
      sessionStorage.setItem("aiPlan", data.aiPlan);
      sessionStorage.setItem("destination", destination);

      // ✅ Navigate with planId and plan info
      navigate(`/ai-plan/${data.planId}`, {
        state: {
          aiPlan: data.aiPlan,
          destination,
          startDate,
          endDate,
        },
      });
    } else {
      setAiPlan("AI could not generate a plan. Please try again.");
    }
  } catch (error) {
    setAiPlan("Error fetching AI plan. Please try again.");
    console.error(error);
  }

  setLoading(false);
};


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[800px] max-h-[90vh] shadow-lg relative flex flex-col">
            {/* Overlay Blur and Loading */}
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
            >
              ❌
            </button>

            <h2 className="text-3xl font-bold mb-4">Create Travel Plan</h2>

            <div className="overflow-y-auto flex-grow px-2" style={{ maxHeight: "65vh" }}>
              <DestinationInput destination={destination} setDestination={setDestination} />
              <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
              <ActivitySelector selectedActivities={selectedActivities} toggleActivity={toggleActivity} />
              <GroupSelector selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
              <BudgetSelector budget={budget} setBudget={setBudget} />
            </div>

            <PlanButtons generateAIPlan={generateAIPlan} loading={loading} />
            <AIPlanDisplay aiPlan={aiPlan} />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlanModal;