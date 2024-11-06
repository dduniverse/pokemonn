const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center font-bold pb-2.5 p-2 px-5 bg-white rounded-lg">
    <div className="font-bold">{label}</div>
    <div className="font-normal">{value}</div>
  </div>
);

export default StatBox;