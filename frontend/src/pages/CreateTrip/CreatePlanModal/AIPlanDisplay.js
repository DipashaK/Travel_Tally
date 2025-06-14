const AIPlanDisplay = ({ aiPlan }) =>
    aiPlan && (
      <div className="bg-gray-100 p-4 mt-4 rounded shadow">
        <h3 className="text-lg font-bold">AI-Generated Travel Plan</h3>
        <p className="text-gray-700 whitespace-pre-line mt-2">{aiPlan}</p>
      </div>
    );
  
  export default AIPlanDisplay;
  