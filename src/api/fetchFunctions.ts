import { fetchData } from './fetchData';
import { EvolutionChainSchema, PokemonDetailSchema, PokemonListSchema, PokemonRegionListSchema, SpeciesDataSchema } from '../types/schemas';
import { createPokemonUrl } from '../utils/urlUtils';
import { regionUrls } from '../utils/constants';


// 기본 포켓몬 목록 요청
export const fetchPokemonData = async (region: string, page: number, itemsPerPage: number) => {
  const queryUrl = region === 'All'
    ? createPokemonUrl(region, page, itemsPerPage)
    : regionUrls[region];

  const response = await fetchData(queryUrl);
  return region === 'All' 
    ? PokemonListSchema.parse(response)
    : PokemonRegionListSchema.parse(response);
};

// 개별 포켓몬 데이터 요청
export const fetchPokemonDetailData = async (pokemonId: number) => {
  const newUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const response = await fetchData(newUrl);
  return PokemonDetailSchema.parse(response);
};

// 여러 포켓몬 데이터 요청
export const fetchMultiplePokemonDetails = async (pokemonId: number) => {
  const response = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  return PokemonDetailSchema.parse(response);
}

// 모든 region 데이터 요청
export const fetchPrefetchedRegionData = async (url: string) => {
  const response = await fetchData(url);
  return PokemonRegionListSchema.parse(response);
}

// All 지역에서 앞뒤 2페이지 데이터 요청
export const fetchPrefetchedAllData = async (region: string, page: number, itemsPerPage: number) => {
  const url = createPokemonUrl(region, page, itemsPerPage);
  const response = await fetchData(url);
  return PokemonListSchema.parse(response)
};

// species 데이터 요청
export const fetchSpeciesData = async (speciesUrl: string) => {
  const data = await fetchData(speciesUrl);
  return SpeciesDataSchema.parse(data);
};

// 진화 데이터 요청
export const fetchEvolutionData = async (evolutionUrl: string) => {
  if (!evolutionUrl) return null;
  const data = await fetchData(evolutionUrl);
  return EvolutionChainSchema.parse(data.chain);
};

// 이전 포켓몬 데이터 요청
export const fetchPreviousPokemon = async (pokemonId: number) => {
  const newUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId - 1}`;
  const response = await fetchData(newUrl);
  return PokemonDetailSchema.parse(response);
};

// 다음 포켓몬 데이터 요청
export const fetchNextPokemon = async (pokemonId: number) => {
  const newUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId + 1}`;
  const response = await fetchData(newUrl);
  return PokemonDetailSchema.parse(response);
};


// 포켓몬 이름으로 데이터 요청
export const fetchPokemonByName = async (name: string) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetchData(url);
    return PokemonDetailSchema.parse(response);  
  } catch (error) {
    console.error(`Error fetching Pokémon data for name: ${name}`, error);
    throw new Error("Failed to fetch Pokémon by name");
  }
};