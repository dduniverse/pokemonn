import { getIdFromUrl } from '../utils/urlUtils';
import { CombinedPokemonType, PokemonDetailType, PokemonEntryType, ResultType } from '../types/schemas';

export const getPokemonIdAndName = (
  data: CombinedPokemonType
): { id: number; name: string } => {
  if ('pokemon_species' in data) {
    // PokemonEntryType
    const id = Number(getIdFromUrl(data.pokemon_species.url));
    const name = data.pokemon_species.name;
    return { id, name };
  } else if ('url' in data) {
    // ResultType
    const id = Number(getIdFromUrl(data.url));
    const name = data.name;
    return { id, name };
  } else {
    // PokemonDetailType
    const id = data.id;
    const name = data.name;
    return { id, name };
  }
};