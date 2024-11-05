import { Stack, Typography } from '@mui/material';
import NavigationButton from './common/NavigationButton';
import { Pokemon } from '../types/types';
import { queryClient } from '../api/queryClient';
import { queries } from '../api/queries';


interface PokemonNavigationProps {
  pokemonData: Pokemon;
  prevPokemonName: string | null;
  nextPokemonName: string | null;
  handleClick: (id: number, name: string | null) => void;
}

function PokemonNavigation({pokemonData, prevPokemonName, nextPokemonName, handleClick}: PokemonNavigationProps) {

  const handleHover = (id: number) => {
    queryClient.prefetchQuery(queries.getPokemonDetailData(id));
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <NavigationButton
        onClick={() => handleClick(pokemonData.id - 1, prevPokemonName)} 
        onMouseEnter={() => handleHover(pokemonData.id - 1)}
        disabled={!prevPokemonName}
        id={pokemonData.id - 1}
        name={prevPokemonName}
      />
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {pokemonData.name} No. {pokemonData.id}
      </Typography>
      <NavigationButton
        onClick={() => handleClick(pokemonData.id + 1, nextPokemonName)} 
        onMouseEnter={() => handleHover(pokemonData.id + 1)}
        disabled={!nextPokemonName}
        id={pokemonData.id + 1}
        name={nextPokemonName}
      />
    </Stack>
  );
};

export default PokemonNavigation;
