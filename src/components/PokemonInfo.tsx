import { Box, Stack } from '@mui/material';
import { Type } from '../types/types';
import PokemonImage from './common/PokemonImage';
import TypeChip from './common/TypeChip';
import StatBox from './common/StatBox';


const PokemonInfo = ({ pokemonData, selectedRegion }: { pokemonData: any, selectedRegion: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E9E9E9', gap: '2em', borderRadius: '5px', padding: '1em'}}>
    <PokemonImage id={pokemonData.id} name={pokemonData.name} />
    <Stack sx={{ alignItems: 'center', gap: '0.5em' }}>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: '0.6em' }}>
        <StatBox label="Height" value={`${pokemonData.height / 10}m`} />
        <StatBox label="Weight" value={`${pokemonData.weight / 10}kg`} />
      </Stack>
      <Stack direction="row" spacing={1}>
      {pokemonData.types.map((type: Type) => (
          <TypeChip key={type.type.name} type={type} /> 
        ))}
      </Stack>
    </Stack>
  </Box>
);

export default PokemonInfo;