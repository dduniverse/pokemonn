import { SelectChangeEvent } from '@mui/material';
import { SetStateAction, Dispatch, ChangeEvent } from 'react';
import { queryClient } from '../api/queryClient';
import { queries } from '../api/queries';

const ITEMS_PER_PAGE = 20;

interface HandlersProps {
  setSelectedSortOption: (option: string) => void;  
  setCurrentPage: (page: number) => void;
  setSelectedRegion: (region: string) => void;      
  setSearchQuery: Dispatch<SetStateAction<string>>; 
  setFetchedPages: Dispatch<SetStateAction<Set<number>>>; 
  selectedRegion: string;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const homeHandlers = ({setSelectedSortOption, setCurrentPage, setSelectedRegion, setSearchQuery, setFetchedPages, selectedRegion, scrollRef}: HandlersProps) => ({
  handleSortOptions: (e: SelectChangeEvent<string>) => {
    setSelectedSortOption(e.target.value);
    setCurrentPage(1);
    setFetchedPages(new Set());
  },

  handleRegions: (e: SelectChangeEvent<string>) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);
    setSelectedSortOption('Lowest Number');
    setCurrentPage(1);
    setFetchedPages(new Set());
  },

  handleSearchChange: (query: string) => {
    setSearchQuery(query);
    setSelectedRegion('All');
    setCurrentPage(1);
    setFetchedPages(new Set());
  },

  handlePageHover: (page: number) => {
    if (selectedRegion === 'All') {
      queryClient.prefetchQuery({
        ...queries.getPrefetchedAllData(selectedRegion, page, ITEMS_PER_PAGE),
      });
    }
  },

  handlePageChange: (e: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },
});
