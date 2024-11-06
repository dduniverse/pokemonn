import { useRef } from 'react';
import { queryClient } from '../api/queryClient';
import { queries } from '../api/queries';

export const usePokemonPrefetch = () => {
  const prefetchedIds = useRef(new Set<number>());

  return (id: number) => {
    if (!prefetchedIds.current.has(id)) {
      prefetchedIds.current.add(id);
      queryClient.prefetchQuery(queries.getPokemonDetailData(id));
      queryClient.prefetchQuery(queries.getSpeicesByID(id));
      queryClient.prefetchQuery(queries.getPreviousPokemon(id));
      queryClient.prefetchQuery(queries.getNextPokemon(id));
    }
  };
};