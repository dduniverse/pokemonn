import { FormLabel, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SortOptionsProps {
  selectedSortOption: string;
  handleSortOptions: (e: SelectChangeEvent<string>) => void;
}

function SortOptions({ selectedSortOption, handleSortOptions }: SortOptionsProps) {
  return (
    <FormControl sx={{ width: 230 }}>
      <FormLabel id="sort-option-label">Sort Options</FormLabel>
      <Select
        labelId="sort-option-label"
        id="sort-option"
        value={selectedSortOption}
        onChange={handleSortOptions}
      >
        <MenuItem value="Lowest Number">Lowest Number</MenuItem>
        <MenuItem value="Highest Number">Highest Number</MenuItem>
        <MenuItem value="A-Z">A-Z</MenuItem>
        <MenuItem value="Z-A">Z-A</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortOptions;
