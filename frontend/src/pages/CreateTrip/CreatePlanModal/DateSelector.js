const DateSelector = ({ startDate, setStartDate, endDate, setEndDate }) => (
    <div>
      <label className="block font-semibold">Select Travel Dates</label>
      <div className="flex gap-4 mt-2 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600 text-sm">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 border rounded mt-1"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600 text-sm">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 border rounded mt-1"
            min={startDate}
          />
        </div>
      </div>
    </div>
  );
  
  export default DateSelector;  