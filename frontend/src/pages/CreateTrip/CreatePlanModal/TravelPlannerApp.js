import { useState } from "react";
import Header from "./Header";
import TicketLayout from "./TicketLayout";
import { T } from "./constants";
import { GLOBAL_CSS } from "./styles";

const TravelPlannerApp = () => {
  const [destination, setDestination] = useState("");
  const [locked, setLocked] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedGroup, setSelectedGroup] = useState("");
  const [budget, setBudget] = useState("");

  const [selectedActivities, setSelectedActivities] = useState([]);

  const [aiPlan, setAiPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const [saved, setSaved] = useState(false);

  const [ticketNo] = useState(() =>
    Math.floor(1000 + Math.random() * 9000)
  );

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  const generateAIPlan = async () => {
    setLoading(true);
    setAiPlan("");

    try {
      const prompt = `Create a concise, exciting travel itinerary as plain text (no markdown symbols).

Destination: ${destination || "a surprise destination"}

Dates: ${startDate || "flexible"} to ${endDate || "flexible"}

Traveling as: ${selectedGroup || "not specified"}

Budget/fare class: ${budget || "not specified"}

Preferred activities:
${selectedActivities.join(", ") || "a good mix of everything"}

Keep it to a short day-by-day outline with 1-2 lines per day, plus one closing tip.`;

      const response = await fetch(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 1000,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const text = (data.content || [])
        .map((item) => item.text || "")
        .join("\n")
        .trim();

      setAiPlan(
        text ||
          "Couldn't print a plan this time — try again."
      );
    } catch (error) {
      console.error(error);

      setAiPlan(
        "The printer jammed — something went wrong generating your plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="gt-root min-h-full w-full flex items-center justify-center p-4 sm:p-8"
      style={{
        background: T.paperDark,
      }}
    >
      <style>{GLOBAL_CSS}</style>

      <div className="w-full max-w-4xl gt-animate-in">
        <Header ticketNo={ticketNo} />

        <TicketLayout
          destination={destination}
          setDestination={setDestination}
          locked={locked}
          setLocked={setLocked}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          budget={budget}
          setBudget={setBudget}
          selectedActivities={selectedActivities}
          toggleActivity={toggleActivity}
          aiPlan={aiPlan}
          loading={loading}
          saved={saved}
          onSave={handleSave}
          onGenerate={generateAIPlan}
        />
      </div>
    </div>
  );
};

export default TravelPlannerApp;