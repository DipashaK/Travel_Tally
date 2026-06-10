// const PlanButtons = ({ generateAIPlan, loading }) => (
//     <div className="flex gap-4 mt-4">
//       <button className="bg-blue-200 text-black p-3 rounded w-1/2 hover:bg-blue-400">
//         Create Your Plan
//       </button>
//       <button
//         className="bg-purple-300 text-black p-3 rounded w-1/2 hover:bg-purple-400"
//         onClick={generateAIPlan}
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate AI Plan"}
//       </button>
//     </div>
//   );
  
//   export default PlanButtons;



import { useNavigate } from "react-router-dom";

const PlanButtons = ({ generateAIPlan, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 mt-4">
      <button
        className="bg-blue-200 text-black p-3 rounded w-1/2 hover:bg-blue-400"
        onClick={() => navigate("/create-plan")}
      >
        Create Your Plan
      </button>
      <button
        className="bg-purple-300 text-black p-3 rounded w-1/2 hover:bg-purple-400"
        onClick={generateAIPlan}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Plan"}
      </button>
    </div>
  );
};

export default PlanButtons;
