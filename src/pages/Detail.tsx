import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Typography, Skeleton } from '@mui/material';

import PokemonInfo from '../components/PokemonInfo';
import EvolutionList from '../components/EvolutionList';
import PokemonNavigation from '../components/PokemonNavigation';

import { GroupedEvolution } from '../types/types';
import { extractEvolutionData } from '../utils/evolutionUtils';
import { useSelectedStore } from '../store/useSelectedStore';
import { usePageStore } from '../store/usePageStore';
import { queries } from '../api/queries';


function Detail() {
  const navigate = useNavigate();
  const { selectedID, setSelectedID, setSelectedName } = useSelectedStore();
  const { selectedRegion } = usePageStore();

  const [prevPokemonName, setPrevPokemonName] = useState<string | null>(null);
  const [nextPokemonName, setNextPokemonName] = useState<string | null>(null);

  // 포켓몬 상세 데이터 가져오기
  const { data: pokemonData, error: pokemonError, isLoading: isPokemonLoading } = useQuery({
    ...queries.getPokemonDetailData(selectedID)
  });

  // 종 데이터 가져오기
  const { data: speciesResponse, error: speciesError, isLoading: isSpeciesLoading } = useQuery({
    ...queries.getSpecies(pokemonData?.species?.url ?? ''),
    enabled: !!pokemonData?.species?.url,
  });

  // 진화 데이터 가져오기
  const { data: evolutionChain, error: evolutionError, isLoading: isEvolutionLoading } = useQuery({
    ...queries.getEvolution(speciesResponse?.evolution_chain?.url ?? ''),
    enabled: !!speciesResponse?.evolution_chain?.url,
  });

  // 이전 포켓몬 데이터 가져오기
  const { data: prevPokemonData } = useQuery({
    ...queries.getPreviousPokemon(pokemonData?.id ?? 1)
  });

  // 다음 포켓몬 데이터 가져오기
  const { data: nextPokemonData } = useQuery({
    ...queries.getNextPokemon(pokemonData?.id ?? 1)
  });

  // prevPokemonData와 nextPokemonData가 로드되면 이름을 설정
  useEffect(() => {
    setPrevPokemonName(prevPokemonData ? prevPokemonData.name : null);
  }, [prevPokemonData]);

  useEffect(() => {
    setNextPokemonName(nextPokemonData ? nextPokemonData.name : null);
  }, [nextPokemonData]);

  // 클릭 시 페이지 이동
  const handleClick = (id: number, name: string | null) => {
    setSelectedID(id);
    setSelectedName(name);
    navigate(`/detail/${id}`);
  };

  const isLoading = isPokemonLoading || isSpeciesLoading || isEvolutionLoading;
  const hasError = pokemonError || speciesError || evolutionError;

  if (isLoading) {
    return (
      <div className="flex flex-col p-8 gap-8">
        <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 1 }} />
        <Skeleton variant="rectangular" height={135} sx={{ marginBottom: 1 }} />
        <Skeleton variant="rectangular" height={200} sx={{ marginBottom: 1 }} />
      </div>
    );
  }

  if (hasError || !pokemonData || !speciesResponse || !evolutionChain) {
    return <Typography>Error fetching data.</Typography>;
  }
  
  const evolutions: GroupedEvolution[] = evolutionChain ? extractEvolutionData(evolutionChain) : [];
  
  return (
    <div className="flex flex-col p-8 gap-8">
      <PokemonNavigation
        pokemonData={pokemonData}
        prevPokemonName={prevPokemonName}
        nextPokemonName={nextPokemonName}
        handleClick={handleClick}
      />
      <PokemonInfo pokemonData={pokemonData} selectedRegion={selectedRegion} />
      <EvolutionList evolutions={evolutions} handleClick={handleClick} />
    </div>
  );
}

export default Detail;
