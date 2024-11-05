import { Box, Typography } from '@mui/material';
import PokemonImage from './common/PokemonImage'; 
import { GroupedEvolution } from '../types/types'; 

interface EvolutionBoxProps {
  pokemon: GroupedEvolution;
  onClick: () => void;
  onMouseEnter: () => void; // Hover 이벤트 핸들러 추가
}

function EvolutionBox({ pokemon, onClick, onMouseEnter }: EvolutionBoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '250px',
        borderRadius: '12px',
        padding: '1em',
        gap: '5px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '0 3px 12px rgba(0, 0, 0, 0.3)',
        },
        backgroundColor: '#F9F9F9',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter} // Hover 이벤트 추가
    >
      <PokemonImage id={pokemon.id} name={pokemon.name} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {pokemon.name}
      </Typography>
    </Box>
  );
};

export default EvolutionBox;
