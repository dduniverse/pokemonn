import { CombinedListType, CombinedPokemonType, PokemonEntryType, PokemonListType, PokemonRegionListType, ResultType } from '../types/schemas';
import { sortData } from './sortingUtils';

interface ProcessedData {
  filteredData: CombinedPokemonType[];
  currentData: CombinedPokemonType[];
  totalPages: number;
}

// 타입 가드 함수
const isAllRegionData = (data: CombinedListType | undefined): data is PokemonListType => 
  !!data && 'results' in data && Array.isArray(data.results);

const isRegionSpecificData = (data: CombinedListType | undefined): data is PokemonRegionListType => 
  !!data && 'pokemon_entries' in data && Array.isArray(data.pokemon_entries);

// 검색어로 데이터 필터링하는 함수
function filterBySearchQuery(
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
      currentData: [],
      totalPages: 1,
    };
  }

  if (!isAllRegionData(data) && !isRegionSpecificData(data)) {
    return {
      filteredData: [data],
      currentData: [data],
      totalPages: 1,
    };
  }

  // 검색어로 필터링된 데이터
  const filteredData = filterBySearchQuery(data, searchQuery, selectedRegion);
  
  // 정렬된 데이터
  const sortedData = sortData(filteredData, selectedSortOption, selectedRegion);
  
  // 페이지네이션된 데이터
  const currentData = selectedRegion === 'All'
    ? sortedData
    : sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 페이지 수 계산
  const totalPages = searchQuery
    ? 1 // 검색어가 있으면 1페이지로 고정
    : isAllRegionData(data) && data.count 
      ? Math.ceil(data.count / itemsPerPage)
      : Math.ceil(sortedData.length / itemsPerPage);

  return { filteredData, currentData, totalPages };
}
