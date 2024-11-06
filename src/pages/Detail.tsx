import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Skeleton } from '@mui/material';

import PokemonInfo from '../components/PokemonInfo';
import EvolutionList from '../components/EvolutionList';
import PokemonNavigation from '../components/PokemonNavigation';

import { GroupedEvolution } from '../types/types';
import { extractEvolutionData } from '../utils/evolutionUtils';
import { queries } from '../api/queries';
import { usePokemonNavigationStore } from '../store/usePokemonNavigationStore';

function LoadingSkeleton() {
  return (
    <div className="flex flex-col p-8 gap-8">
      <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 1 }} />
      <Skeleton variant="rectangular" height={135} sx={{ marginBottom: 1 }} />
      <Skeleton variant="rectangular" height={200} sx={{ marginBottom: 1 }} />
    </div>
  );
}

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  const pokemonID = Number(id); // number로 변환

  const { setPrevPokemonName, setNextPokemonName, prevPokemonName, nextPokemonName } = usePokemonNavigationStore();

  // 포켓몬 상세 데이터 가져오기
  const { data: pokemonData, error: pokemonError, isPending: isPokemonPending } = useQuery({
    ...queries.getPokemonDetailData(pokemonID)
  });

  // 종 데이터 가져오기
  const { data: speciesResponse, error: speciesError, isPending: isSpeciesPending } = useQuery({
    ...queries.getSpecies(pokemonData?.species?.url ?? ''),
    enabled: !!pokemonData?.species?.url,
  });

  // 진화 데이터 가져오기
  const { data: evolutionChain, error: evolutionError, isPending: isEvolutionPending } = useQuery({
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
  const handleClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const isPending = isPokemonPending || isSpeciesPending || isEvolutionPending;
  const hasError = pokemonError || speciesError || evolutionError;

  if (isPending) {
    return <LoadingSkeleton />;
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
      <PokemonInfo pokemonData={pokemonData} />
      <EvolutionList evolutions={evolutions} handleClick={handleClick} />
    </div>
  );
}

export default Detail;
