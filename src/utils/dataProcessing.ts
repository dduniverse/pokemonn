import { CombinedListType, CombinedPokemonType, PokemonEntryType, PokemonListType, PokemonRegionListType, ResultType } from '../types/schemas';
import { sortData } from './sortingUtils';

interface ProcessedData {
  filteredData: CombinedPokemonType[];
  sortedData: CombinedPokemonType[];
  currentData: CombinedPokemonType[];
}

// 타입 가드 함수 수정
const isAllRegionData = (data: CombinedListType | undefined): data is PokemonListType => 
  !!data && 'results' in data && Array.isArray(data.results);

const isRegionSpecificData = (data: CombinedListType | undefined): data is PokemonRegionListType => 
  !!data && 'pokemon_entries' in data && Array.isArray(data.pokemon_entries);

// 검색어로 데이터 필터링하는 함수
export function filterBySearchQuery(
  data: CombinedListType | undefined, 
  searchQuery: string, 
  selectedRegion: string
): ResultType[] | PokemonEntryType[] {
  if (!data) return [];
  if (selectedRegion === 'All' && isAllRegionData(data)) {
    return data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (isRegionSpecificData(data)) {
    return data.pokemon_entries.filter((pokemon) =>
      pokemon.pokemon_species.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return [];
}

// 데이터 처리 함수
export function getProcessedData(
  data: CombinedListType | undefined,
  searchQuery: string,
  selectedSortOption: string,
  selectedRegion: string,
  currentPage: number,
  itemsPerPage: number
): ProcessedData {
  if (!data) {
    return {
      filteredData: [],
      sortedData: [],
      currentData: [],
    };
  }

  if (!isAllRegionData(data) && !isRegionSpecificData(data)) {
    return {
      filteredData: [data],
      sortedData: [data],
      currentData: [data],
    };
  }

  const filteredData = filterBySearchQuery(data, searchQuery, selectedRegion);
  const sortedData = sortData(filteredData, selectedSortOption, selectedRegion);
  const currentData = 
    selectedRegion === 'All' 
      ? sortedData 
      : sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { filteredData, sortedData, currentData };
}
