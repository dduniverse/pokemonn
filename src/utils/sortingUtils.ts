// sortingUtils.ts
import { Result, PokemonEntry } from '../types/types';
import { getIdFromUrl } from './urlUtils';

const sortPokemonData = (sortOption: string, data: Result[] | PokemonEntry[], region: string) => {
  if (region === 'All' && Array.isArray(data)) {
    const sortedResults = [...data].sort((a, b) => {
      if ('url' in a && 'url' in b) {
        const aId = getIdFromUrl(a.url);
        const bId = getIdFromUrl(b.url);

        switch (sortOption) {
          case 'Lowest Number':
            return aId - bId;
          case 'Highest Number':
            return bId - aId;
          case 'A-Z':
            return a.name.localeCompare(b.name);
          case 'Z-A':
            return b.name.localeCompare(a.name);
          default:
            return 0; 
        }
      }
      return 0; 
    });

    // console.log('Sorted Results:', sortedResults); 
    return sortedResults;

  } else if (data && data.length > 0 && 'pokemon_species' in data[0]) {
    const sortedEntries = [...data].sort((a, b) => {
      const aEntry = a as PokemonEntry;
      const bEntry = b as PokemonEntry;

      const aId = getIdFromUrl(aEntry.pokemon_species.url);
      const bId = getIdFromUrl(bEntry.pokemon_species.url);

      switch (sortOption) {
        case 'Lowest Number':
          return aId - bId;
        case 'Highest Number':
          return bId - aId;
        case 'A-Z':
          return (a as PokemonEntry).pokemon_species.name.localeCompare((b as PokemonEntry).pokemon_species.name);
        case 'Z-A':
          return (b as PokemonEntry).pokemon_species.name.localeCompare((a as PokemonEntry).pokemon_species.name);
        default:
          return 0;
      }
    });
    return sortedEntries;
  }
  console.warn('No valid data to sort');
  return [];
};


export const sortData = (data: Result[] | PokemonEntry[], sortOption: string, region: string) => {
  return sortPokemonData(sortOption, data, region);
};