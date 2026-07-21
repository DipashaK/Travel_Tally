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
        : [...prev, activity],
    );
  };

  const generateAIPlan = async () => {
    setLoading(true);
    setAiPlan("");

    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        "https://travel-tally-3mf9.onrender.com/api/plans/generate-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            startDate,
            endDate,
            selectedActivities,
            selectedGroup,
            budget,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setAiPlan(data.error || "Error fetching AI plan. Please try again.");
        return;
      }

      if (data.aiPlan && data.planId) {
        setAiPlan(data.aiPlan);

        sessionStorage.setItem("planId", data.planId);
        sessionStorage.setItem("aiPlan", data.aiPlan);
        sessionStorage.setItem("destination", destination);

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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-6">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-lg relative">
            {/* Loading */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              ❌
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6">Create Travel Plan</h2>

              <div className="px-2 pb-6">
                <DestinationInput
                  destination={destination}
                  setDestination={setDestination}
                />

                <DateSelector
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />

                <ActivitySelector
                  selectedActivities={selectedActivities}
                  toggleActivity={toggleActivity}
                />

                <GroupSelector
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                />

                <BudgetSelector budget={budget} setBudget={setBudget} />
              </div>

<PlanButtons
  onGenerate={generateAIPlan}
  loading={loading}
/>
              <div className="mt-8">
                <AIPlanDisplay aiPlan={aiPlan} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlanModal;
