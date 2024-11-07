import { useQueries } from "@tanstack/react-query";
import { CombinedPokemonType, PokemonDetailType } from "../types/schemas";
import { queries } from "../api/queries";

export function useAdditionalData(pokemonData: CombinedPokemonType[]) {
  const additionalDataQueries = useQueries({
    queries: queries.getMultiplePokemonDetails(pokemonData),
  });

  const additionalData: Record<string, PokemonDetailType> = {};
  additionalDataQueries.forEach((query, index) => {
    const item = pokemonData[index];
    const name = 'pokemon_species' in item ? item.pokemon_species.name : item.name;
    if (query.data) {
      additionalData[name.toLowerCase()] = query.data;
    }
  });

  return additionalData;
}