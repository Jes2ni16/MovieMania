const DateInput = ({ label, setDate, date }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm">{label}</label>
      <input
        type="date"
        value={date}
        className="text-sm text-gray-400 px-2 py-1.5 my-1 rounded-md"
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
