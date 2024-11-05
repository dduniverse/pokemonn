// urlUtils.ts

export const getIdFromUrl = (url: string): number => {
  const parts = url.split('/');  
  return parseInt(parts[parts.length - 2], 10);
};

export function createPokemonUrl(region: string, page: number, itemsPerPage: number): string {
  const baseUrl = region === 'All'
    ? 'https://pokeapi.co/api/v2/pokemon'
    : `https://pokeapi.co/api/v2/region/${region}/pokemon_species`;

  const offset = (page - 1) * itemsPerPage;
  return `${baseUrl}?limit=${itemsPerPage}&offset=${offset}`;
};
