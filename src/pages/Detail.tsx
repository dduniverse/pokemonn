import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import PokemonInfo from '../components/common/PokemonInfo';
import EvolutionList from '../components/evolution/EvolutionList';
import PokemonNavigation from '../components/navigation/PokemonNavigation';
import PokemonImage from '../components/common/PokemonImage';
import { LoadingSkeletonList } from '../components/common/LoadingSkeleton';

import { GroupedEvolution } from '../types/types';
import { extractEvolutionData } from '../utils/evolutionUtils';
import { queries } from '../api/queries';
import { usePokemonNavigationStore } from '../store/usePokemonNavigationStore';


function Detail() {
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

  const isPending = isPokemonPending || isSpeciesPending || isEvolutionPending;
  const hasError = pokemonError || speciesError || evolutionError;

  if (isPending) {
    return <LoadingSkeletonList />;
  }

  if (hasError || !pokemonData || !speciesResponse || !evolutionChain) {
    return <p>Error fetching data.</p>;
  }
  
  const evolutions: GroupedEvolution[] = evolutionChain ? extractEvolutionData(evolutionChain) : [];
  
  return (
    <div className="flex flex-col p-8 gap-8">
      <PokemonNavigation
        pokemonData={pokemonData}
        prevPokemonName={prevPokemonName}
        nextPokemonName={nextPokemonName}
      />
      <div className="flex justify-center items-center bg-gray-200 gap-8 rounded-md p-4">
        <PokemonImage id={pokemonData.id} name={pokemonData.name} />
        <PokemonInfo pokemonData={pokemonData} />
      </div>
      <EvolutionList evolutions={evolutions} />
    </div>
  );
}

export default Detail;
