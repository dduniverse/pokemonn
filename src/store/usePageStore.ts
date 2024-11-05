import { create } from "zustand";

// page 관련 정보 
interface PageState {
  currentPage: number;
  selectedSortOption: string;
  selectedRegion: string;
  setCurrentPage: (page: number) => void;
  setSelectedSortOption: (option: string) => void;
  setSelectedRegion: (region: string) => void;
}

export const usePageStore = create<PageState>((set) => ({
  currentPage: 1,
  selectedSortOption: 'Lowest Number',
  selectedRegion: 'All',
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setSelectedSortOption: (option: string) => set({ selectedSortOption: option }),
  setSelectedRegion: (region: string) => set({ selectedRegion: region }),
}));

