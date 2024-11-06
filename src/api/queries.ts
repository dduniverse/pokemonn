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
import { PokemonEntryType, ResultType } from '../types/schemas';
import { getIdFromUrl } from '../utils/urlUtils';


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

  getMultiplePokemonDetails: (currentData: Array<ResultType | PokemonEntryType>) =>
    currentData.map((pokemon) => {
      const pokemonId = getIdFromUrl('pokemon_species' in pokemon ? pokemon.pokemon_species.url : pokemon.url);
      
      return queryOptions ({
        queryKey: ['pokemonDetail', pokemonId],
        queryFn: () => fetchMultiplePokemonDetails(pokemonId),
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
