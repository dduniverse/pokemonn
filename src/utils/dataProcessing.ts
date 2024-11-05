import { Result, PokemonEntry } from '../types/types';
import { sortData } from './sortingUtils';

interface ProcessedData {
  filteredData: (Result | PokemonEntry)[];
  sortedData: (Result | PokemonEntry)[];
  currentData: (Result | PokemonEntry)[];
}

const isAllRegionData = (data: any): data is { results: Result[] } => data && 'results' in data;
const isRegionSpecificData = (data: any): data is { pokemon_entries: PokemonEntry[] } => data && 'pokemon_entries' in data;


// 검색어로 데이터 필터링하는 함수
export function filterBySearchQuery(data: any, searchQuery: string, selectedRegion: string): (Result[] | PokemonEntry[]) {
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
  data: any,
  searchQuery: string,
  selectedSortOption: string,
  selectedRegion: string,
  currentPage: number,
  itemsPerPage: number
): ProcessedData {
  // 개별 포켓몬 데이터일 경우
  if (data && !isAllRegionData(data) && !isRegionSpecificData(data)) {
    return {
      filteredData: [data],
      sortedData: [data],
      currentData: [data], // 필터링 및 페이지네이션 없이 단일 개체를 반환
    };
  }

  // 검색 필터 적용
  const filteredData = filterBySearchQuery(data, searchQuery, selectedRegion);

  // 정렬
  const sortedData = sortData(filteredData, selectedSortOption, selectedRegion);

  // 페이지네이션
  const currentData =
    selectedRegion === 'All'
      ? sortedData
      : sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { filteredData, sortedData, currentData };
}
