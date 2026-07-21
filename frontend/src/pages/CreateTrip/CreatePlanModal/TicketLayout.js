import TicketStub from "./TicketStub";
import Perforation from "./Perforation";
import ReceiptPanel from "./ReceiptPanel";
import { T } from "./constants";

const TicketLayout = ({
  destination,
  setDestination,
  locked,
  setLocked,

  startDate,
  setStartDate,

  endDate,
  setEndDate,

  selectedGroup,
  setSelectedGroup,

  budget,
  setBudget,

  selectedActivities,
  toggleActivity,

  aiPlan,
  loading,
  saved,

  onSave,
  onGenerate,
}) => {
  return (
    <div
      className="relative flex flex-col md:flex-row rounded-b-xl shadow-2xl overflow-hidden"
      style={{ background: T.paper }}
    >
      <TicketStub
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
        loading={loading}
        saved={saved}
        onSave={onSave}
        onGenerate={onGenerate}
      />

      <Perforation />

      <ReceiptPanel
        aiPlan={aiPlan}
        loading={loading}
      />
    </div>
  );
};

export default TicketLayout;