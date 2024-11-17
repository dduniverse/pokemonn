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
  fetchSpeciesDataByID,
} from './fetchFunctions';
import { CombinedPokemonType } from '../types/schemas';
import { getPokemonIdAndName } from '../utils/getPokemonIdAndName';


export const queries = {
  getPokemonData: (region: string, page: number, itemsPerPage: number) =>
    queryOptions({
      queryKey: region === 'All' ? ['pokemonData', region, page] : ['pokemonData', region],
      queryFn: () => fetchPokemonData(region, page, itemsPerPage),
      enabled: !!region,
    }),

  getPokemonDetailData: (pokemonId: number) =>
    queryOptions({
      queryKey: ['pokemonDetail', pokemonId],
      queryFn: () => fetchPokemonDetailData(pokemonId),
    }),

  getMultiplePokemonDetails: (currentData: Array<CombinedPokemonType>) =>
    currentData.map((pokemon) => {
      const { id } = getPokemonIdAndName(pokemon); 
      
      return queryOptions ({
        queryKey: ['pokemonDetail', id],
        queryFn: () => fetchMultiplePokemonDetails(id),
      })
    }),

  getPrefetchedRegionData: (region: string, url: string) =>
    queryOptions({
      queryKey: ['pokemonData', region],
      queryFn: () => fetchPrefetchedRegionData(url),
    }),

  getPrefetchedAllData: (region: string, page: number, itemsPerPage: number) =>
    queryOptions({
      queryKey: ['pokemonData', region, page],
      queryFn: () => fetchPrefetchedAllData(region, page, itemsPerPage),
    }),

  getSpecies: (speciesUrl: string) =>
    queryOptions({
      queryKey: ['speciesData', speciesUrl],
      queryFn: () => fetchSpeciesData(speciesUrl),
      enabled: !!speciesUrl,
    }),

  getSpeicesByID: (pokemonId: number) =>
    queryOptions({
      queryKey: ['speciesData', `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`],
      queryFn: () => fetchSpeciesDataByID(pokemonId),
    }),

  getEvolution: (evolutionUrl: string) =>
    queryOptions({
      queryKey: ['evolutionData', evolutionUrl],
      queryFn: () => fetchEvolutionData(evolutionUrl),
      enabled: !!evolutionUrl,
    }),

  getPreviousPokemon: (pokemonId: number) =>
    queryOptions({
      queryKey: ['pokemonData', `https://pokeapi.co/api/v2/pokemon/${pokemonId - 1}/`],
      queryFn: () => fetchPreviousPokemon(pokemonId),
      enabled: pokemonId > 1,
    }),

  getNextPokemon: (pokemonId: number) =>
    queryOptions({
      queryKey: ['pokemonData', `https://pokeapi.co/api/v2/pokemon/${pokemonId + 1}/`],
      queryFn: () => fetchNextPokemon(pokemonId),
    }),

  getPokemonByName: (searchQuery: string) => 
    queryOptions({
      queryKey: ['pokemonSearch', searchQuery],
      queryFn: () => fetchPokemonByName(searchQuery),
      enabled: !!searchQuery,  // 검색어가 있을 때만 요청
    }),
};
