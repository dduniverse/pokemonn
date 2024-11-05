import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query';

import Search from '../components/Search';
import List from '../components/List';
import SortOptions from '../components/SortOptions';
import SelectRegion from '../components/SelectRegion';
import Pagenation from '../components/common/Pagenation';

import { queries } from '../api/queries';
import { regionUrls } from '../utils/constants';
import { getProcessedData } from '../utils/dataProcessing';
import { usePageStore } from '../store/usePageStore';
import { PokemonEntry, Result } from '../types/types';


const ITEMS_PER_PAGE = 20;

function Home() {
  const queryClient = useQueryClient();
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

  // 기본 데이터 요청
  const { data, error, isPending } = useQuery({
    ...queries.getPokemonData(selectedRegion, currentPage, ITEMS_PER_PAGE),
  });

  // 검색어로 포켓몬 검색
  const { data: searchResult, error: searchError } = useQuery({
    ...queries.getPokemonByName(searchQuery),
  });

  // 검색어가 있을 경우 검색 결과를 사용하고, 그렇지 않을 경우 기본 데이터 사용
  const displayData = searchQuery && searchResult ? searchResult : data;
  
  // 데이터 필터링, 정렬 및 페이지네이션 처리
  const { currentData, sortedData } = getProcessedData(
    displayData,
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

  const additionalData: Record<string, any> = {};
  additionalDataQueries.forEach((query, index) => {
    const name = 'pokemon_species' in currentData[index] ? currentData[index].pokemon_species.name : currentData[index].name;
    if (query.data) {
      additionalData[name.toLowerCase()] = query.data;
    }
  });

  // 페이지 수 계산
  const hasCount = (data: any): data is { count: number } => data && 'count' in data;
  const totalPages = searchQuery ? 1 // 검색어가 있을 때는 페이지를 1로 고정
    : selectedRegion === 'All' && hasCount(data)
    ? Math.ceil((data.count || 0) / ITEMS_PER_PAGE)
    : Math.ceil(sortedData.length / ITEMS_PER_PAGE);


  // handler
  const handleSortOptions = (e: SelectChangeEvent<string>) => {
    setSelectedSortOption(e.target.value);
    setCurrentPage(1);
    setFetchedPages(new Set());
  };

  const handleRegions = (e: SelectChangeEvent<string>) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);
    setSelectedSortOption('Lowest Number');
    setCurrentPage(1);
    setFetchedPages(new Set());
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSelectedRegion('All');
    setCurrentPage(1);
    setFetchedPages(new Set());
  };

  // 페이지 Hover 시 prefetch
  const handlePageHover = (page: number) => {
    if (selectedRegion === 'All') {
      queryClient.prefetchQuery({
        ...queries.getPrefetchedAllData(selectedRegion, page, ITEMS_PER_PAGE),
      });
    }
  };

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollRef} className="flex flex-col p-8 gap-8">
      <Search handleSearchChange={handleSearchChange} />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <SelectRegion handleRegions={handleRegions} selectedRegion={selectedRegion} />
        <SortOptions selectedSortOption={selectedSortOption} handleSortOptions={handleSortOptions} />
      </Box>
      <List
        pokemonData={currentData as (PokemonEntry[] | Result[])}
        additionalData={searchQuery ? {} : additionalData}
        isLoading={isPending}
        error={error || searchError}
      />
      {totalPages > 1 && (
        <Pagenation totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} handlePageHover={handlePageHover} />
      )}
    </div>
  );
}

export default Home;
