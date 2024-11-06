import { Box, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface SearchProps {
  handleSearchChange: (query: string) => void;
}

function Search({ handleSearchChange }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearchChange(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <TextField
        id="search-field"
        label="Search Pokemon"
        variant="standard"
        value={searchQuery}
        sx={{
          width: '90%',
          '& .MuiInput-underline:before': {
            borderBottom: '2px solid #d9d9d9',
          },
          '& .MuiInput-underline:after': {
            borderBottom: '2px solid #f59e0b',
          },
          '& .MuiInput-underline:hover:before': {
            borderBottom: '2px solid #f59e0b',
          },
        }}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearchClick}
        className="ml-4 px-4 py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition duration-200"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
