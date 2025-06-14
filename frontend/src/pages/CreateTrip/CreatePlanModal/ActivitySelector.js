const ActivitySelector = ({ selectedActivities, toggleActivity }) => {
    const activities = [
      "Sightseeing",
      "Adventure",
      "Cultural",
      "Historical",
      "Relaxation",
      "Shopping",
      "Nightlife",
    ];
  
    return (
      <div>
        <label className="block font-semibold">Select activities :</label>
        <div className="grid grid-cols-3 gap-3 mt-2 mb-4">
          {activities.map((activity, index) => (
            <button
              key={index}
              onClick={() => toggleActivity(activity)}
              className={`border p-2 rounded transition ${
                selectedActivities.includes(activity)
                  ? "bg-red-200 text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default ActivitySelector;
  