import { Box, TextField, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface SearchProps {
  handleSearchChange: (query: string) => void; 
}

function Search({ handleSearchChange }: SearchProps) {

  // 검색어
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); 
  };

  // 버튼 클릭 시 검색 실행
  const handleSearchClick = () => {
    handleSearchChange(searchQuery); 
  };

  // 엔터키 눌렀을 때 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <Box className="w-full flex flex-row justify-between">
      <TextField
        id="search-field"
        label="Search Pokemon"
        variant="standard"
        value={searchQuery} 
        sx={{
          width: '90%',
          '& .MuiInput-underline:before': {
            borderBottom: '2px solid #d9d9d9', // 기본 색상
          },
          '& .MuiInput-underline:after': {
            borderBottom: '2px solid #f59e0b', // 포커스 색상
          },
          '& .MuiInput-underline:hover:before': {
            borderBottom: '2px solid #f59e0b', // 호버 색상
          },
        }}
        onChange={handleInputChange}   
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="contained"
        sx={{ marginLeft: 2, backgroundColor: '#f59e0b', color: 'white' }}
        onClick={handleSearchClick} // 버튼 클릭 시 검색 실행
      >
        Search
      </Button>
    </Box>
  );
}

export default Search;
