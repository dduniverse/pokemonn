import { queryOptions } from '@tanstack/react-query';
import {
  fetchPokemonData,
  fetchPokemonDetailData,
  fetchPrefetchedRegionData,
  fetchPrefetchedAllData,
  fetchSpeciesData,
  fetchEvolutionData,
  fetchPreviousPokemon,
  fetchNextPokemon,
  fetchMultiplePokemonDetails,
  fetchPokemonByName,
} from './fetchFunctions';
import { PokemonEntry, Result } from '../types/types';
import { getIdFromUrl } from '../utils/urlUtils';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queries = {
  getPokemonData: (region: string, page: number, itemsPerPage: number) =>
    queryOptions({
      queryKey: region === 'All' ? ['pokemonData', region, page] : ['pokemonData', region],
      queryFn: () => fetchPokemonData(region, page, itemsPerPage),
      staleTime: STALE_TIME,
      enabled: !!region,
    }),

  getPokemonDetailData: (pokemonId: number) =>
    queryOptions({
      queryKey: ['pokemonDetail', pokemonId],
      queryFn: () => fetchPokemonDetailData(pokemonId),
      staleTime: STALE_TIME,
    }),

  getMultiplePokemonDetails: (currentData: Array<Result | PokemonEntry>) =>
    currentData.map((pokemon) => {
      const pokemonId = getIdFromUrl('pokemon_species' in pokemon ? pokemon.pokemon_species.url : pokemon.url);
      
      return queryOptions ({
        queryKey: ['pokemonDetail', pokemonId],
        queryFn: () => fetchMultiplePokemonDetails(pokemonId),
        staleTime: STALE_TIME,
      })
    }),

  getPrefetchedRegionData: (region: string, url: string) =>
    queryOptions({
      queryKey: ['pokemonData', region],
      queryFn: () => fetchPrefetchedRegionData(url),
      staleTime: STALE_TIME,
    }),

  getPrefetchedAllData: (region: string, page: number, itemsPerPage: number) =>
    queryOptions({
      queryKey: ['pokemonData', region, page],
      queryFn: () => fetchPrefetchedAllData(region, page, itemsPerPage),
      staleTime: STALE_TIME,
    }),

  getSpecies: (speciesUrl: string) =>
    queryOptions({
      queryKey: ['speciesData', speciesUrl],
      queryFn: () => fetchSpeciesData(speciesUrl),
      staleTime: STALE_TIME,
    }),

  getEvolution: (evolutionUrl: string) =>
    queryOptions({
      queryKey: ['evolutionData', evolutionUrl],
      queryFn: () => fetchEvolutionData(evolutionUrl),
      staleTime: STALE_TIME,
    }),

  getPreviousPokemon: (pokemonId: number) =>
    queryOptions({
      queryKey: ['pokemonData', `https://pokeapi.co/api/v2/pokemon/${pokemonId - 1}/`],
      queryFn: () => fetchPreviousPokemon(pokemonId),
      staleTime: STALE_TIME,
      enabled: pokemonId > 1,
      retry: false,  
    }),

  getNextPokemon: (pokemonId: number) =>
    queryOptions({
      queryKey: ['pokemonData', `https://pokeapi.co/api/v2/pokemon/${pokemonId + 1}/`],
      queryFn: () => fetchNextPokemon(pokemonId),
      staleTime: STALE_TIME,
      // enabled: pokemonId < 10277,
      retry: false,  
    }),

  getPokemonByName: (searchQuery: string) => 
    queryOptions({
      queryKey: ['pokemonSearch', searchQuery],
      queryFn: () => fetchPokemonByName(searchQuery),
      enabled: !!searchQuery,  // 검색어가 있을 때만 요청
      retry: false,            // 검색 실패 시 재시도하지 않음
    }),
};
