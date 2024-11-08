import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery, useQueries } from '@tanstack/react-query';

import Search from '../components/Search';
import List from '../components/List';
import SortOptions from '../components/SortOptions';
import SelectRegion from '../components/SelectRegion';
import Pagenation from '../components/common/Pagenation';

import { queries } from '../api/queries';
import { homeHandlers } from '../handlers/homeHandlers';
import { getProcessedData } from '../utils/dataProcessing';
import { usePageStore } from '../store/usePageStore';
import { PokemonDetailType, PokemonEntryType, ResultType } from '../types/schemas';


const ITEMS_PER_PAGE = 20;

function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedPages, setFetchedPages] = useState<Set<number>>(new Set());

  const {
    currentPage,
    selectedSortOption,
    selectedRegion,
    setCurrentPage,
    setSelectedSortOption,
    setSelectedRegion,
  } = usePageStore();

  // handler
  const { 
    handleSortOptions, 
    handleRegions, 
    handleSearchChange, 
    handlePageHover, 
    handlePageChange 
  } = homeHandlers({setSelectedSortOption, setCurrentPage, setSelectedRegion, setSearchQuery, setFetchedPages, selectedRegion, scrollRef});

  // 기본 데이터 요청
  const { data, error, isPending } = useQuery({
    ...queries.getPokemonData(selectedRegion, currentPage, ITEMS_PER_PAGE),
  });

  // 데이터 필터링, 정렬 및 페이지네이션 처리
  const { currentData, totalPages } = getProcessedData(
    data,
    searchQuery,
    selectedSortOption,
    selectedRegion,
    currentPage,
    ITEMS_PER_PAGE
  );

  // 추가 정보 데이터 요청
  const additionalDataQueries = useQueries({
    queries: searchQuery ? [] : queries.getMultiplePokemonDetails(currentData),
  });

  const additionalData: Record<string, PokemonDetailType> = {};
  additionalDataQueries.forEach((query, index) => {
    const name = 'pokemon_species' in currentData[index] ? currentData[index].pokemon_species.name : currentData[index].name;
    if (query.data) {
      additionalData[name.toLowerCase()] = query.data;
    }
  });

  
  return (
    <div ref={scrollRef} className="flex flex-col p-8 gap-8">
      <Search handleSearchChange={handleSearchChange} />
      <div className="w-full flex flex-row justify-between">
        <SelectRegion handleRegions={handleRegions} selectedRegion={selectedRegion} />
        <SortOptions selectedSortOption={selectedSortOption} handleSortOptions={handleSortOptions} />
      </div>
      <List
        pokemonData={currentData as (PokemonEntryType[] | ResultType[])}
        additionalData={searchQuery ? {} : additionalData}
        isLoading={isPending}
        error={error}
      />
      {totalPages > 1 && (
        <Pagenation totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} handlePageHover={handlePageHover} />
      )}
    </div>
  );
}

export default Home;
