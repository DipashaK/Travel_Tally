const GroupSelector = ({ selectedGroup, setSelectedGroup }) => {
    const groups = ["Solo", "Couple", "Family", "Group"];
  
    return (
      <div>
        <label className="block font-semibold">Who are you traveling with?</label>
        <div className="flex gap-3 mt-2 mb-4">
          {groups.map((group, index) => (
            <button
              key={index}
              onClick={() => setSelectedGroup(group)}
              className={`border p-3 rounded w-full transition ${
                selectedGroup === group
                  ? "bg-green-200 text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default GroupSelector;
  