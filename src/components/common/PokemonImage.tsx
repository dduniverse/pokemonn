import React from 'react';
import { Box } from '@mui/material';

interface PokemonImageProps {
  id: number | null;
  name: string;
  width?: string | number;  
  height?: string | number; 
}

function PokemonImage({ id, name, width = 'auto', height = 'auto' }: PokemonImageProps) {
  return (
    <Box
      component="img"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      alt={name}
      loading="lazy"
      sx={{ width, height }} // default: auto
    />
  );
}

export default PokemonImage;
