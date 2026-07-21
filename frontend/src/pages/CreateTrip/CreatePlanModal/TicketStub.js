import DestinationInput from "./DestinationInput";
import DateSelector from "./DateSelector";
import GroupSelector from "./GroupSelector";
import BudgetSelector from "./BudgetSelector";
import ActivitySelector from "./ActivitySelector";
import PlanButtons from "./PlanButtons";

const TicketStub = ({
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

  loading,
  saved,

  onSave,
  onGenerate,
}) => {
  return (
    <div className="flex-1 p-5 sm:p-7 flex flex-col gap-5">
      <DestinationInput
        destination={destination}
        setDestination={setDestination}
        locked={locked}
        setLocked={setLocked}
      />

      <DateSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <GroupSelector
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />

      <BudgetSelector
        budget={budget}
        setBudget={setBudget}
      />

      <ActivitySelector
        selectedActivities={selectedActivities}
        toggleActivity={toggleActivity}
      />

      <PlanButtons
        onSave={onSave}
        onGenerate={onGenerate}
        loading={loading}
        saved={saved}
      />
    </div>
  );
};

export default TicketStub;