import AIPlanDisplay from "./AIPlanDisplay";
import { T } from "./constants";

const ReceiptPanel = ({ aiPlan, loading }) => {
  return (
    <div
      className="md:w-[300px] p-5 sm:p-7"
      style={{ background: T.paperDark }}
    >
      <AIPlanDisplay
        aiPlan={aiPlan}
        loading={loading}
      />
    </div>
  );
};

export default ReceiptPanel;