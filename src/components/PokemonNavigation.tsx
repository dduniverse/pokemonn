import { Stack, Typography } from '@mui/material';
import NavigationButton from './common/NavigationButton';
import { Pokemon } from '../types/types';


interface PokemonNavigationProps {
  pokemonData: Pokemon;
  prevPokemonName: string | null;
  nextPokemonName: string | null;
  handleClick: (id: number, name: string | null) => void;
}

function PokemonNavigation({pokemonData, prevPokemonName, nextPokemonName, handleClick}: PokemonNavigationProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <NavigationButton
        onClick={() => handleClick(pokemonData.id - 1, prevPokemonName)} 
        disabled={!prevPokemonName}
        id={pokemonData.id - 1}
        name={prevPokemonName}
      />
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {pokemonData.name} No. {pokemonData.id}
      </Typography>
      <NavigationButton
        onClick={() => handleClick(pokemonData.id + 1, nextPokemonName)} 
        disabled={!nextPokemonName}
        id={pokemonData.id + 1}
        name={nextPokemonName}
      />
    </Stack>
  );
};

export default PokemonNavigation;
