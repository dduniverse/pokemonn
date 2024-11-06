import NavigationButton from './common/NavigationButton';
import { Pokemon } from '../types/types';

interface PokemonNavigationProps {
  pokemonData: Pokemon;
  prevPokemonName: string | null;
  nextPokemonName: string | null;
}

function PokemonNavigation({ pokemonData, prevPokemonName, nextPokemonName }: PokemonNavigationProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <NavigationButton
        disabled={!prevPokemonName}
        id={pokemonData.id - 1}
        name={prevPokemonName}
      />
      <p className="text-3xl font-bold">
        {pokemonData.name} No. {pokemonData.id}
      </p>
      <NavigationButton
        disabled={!nextPokemonName}
        id={pokemonData.id + 1}
        name={nextPokemonName}
      />
    </div>
  );
}

export default PokemonNavigation;
