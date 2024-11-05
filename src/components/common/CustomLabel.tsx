interface CustomLabelProps {
  region: string;
  selectedRegion: string;
}

function CustomLabel({ region, selectedRegion }: CustomLabelProps) {
  return (
    <div className={`cursor-pointer border border-solid rounded-md px-3 py-2 transition-colors duration-200 
        ${selectedRegion === region ? 'text-white bg-amber-500' : 'text-gray-700 bg-transparent'}`}
    >
      {region}
    </div>
  );
}


export default CustomLabel;
