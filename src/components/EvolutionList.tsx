import { GroupedEvolution } from '../types/types'; 
import { Box, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EvolutionBox from './EvolutionBox';
import { queries } from '../api/queries';
import { queryClient } from '../api/queryClient';

interface EvolutionListProps {
  evolutions: GroupedEvolution[]; 
  handleClick: (id: number, name: string) => void;
}

function EvolutionArrow({ hasChildren }: { hasChildren: boolean }) {
  return hasChildren ? <ArrowForwardIcon sx={{ color: 'gray', fontSize: '2rem' }} /> : null;
};

function EvolutionList({ evolutions, handleClick }: EvolutionListProps) {
  // 마우스가 Hover 될 때 prefetch
  const handleHover = (id: number) => {
    queryClient.prefetchQuery(queries.getPokemonDetailData(id));
    queryClient.prefetchQuery(queries.getSpeicesByID(id));
    queryClient.prefetchQuery(queries.getPreviousPokemon(id));
    queryClient.prefetchQuery(queries.getNextPokemon(id));
  };

  // 재귀함수
  const renderEvolutions = (pokemon: GroupedEvolution) => {
    const { id, name, children } = pokemon;
    const childrenLength = children?.length ?? 0;

    return (
      <Box key={id} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '3em' }}>
        {/* 부모 */}
        {id !== null && ( // id가 null이 아닐 때만 클릭 이벤트 연결
          <EvolutionBox pokemon={pokemon} onClick={() => handleClick(id, name)} onMouseEnter={() => handleHover(id)} />
        )}
        
        {/* 1명 이상의 자식이 있으면 화살표 표시 */}
        <EvolutionArrow hasChildren={childrenLength > 0} />

        {/* 자식 */}
        {pokemon.children?.length ? (
          <Stack direction="column" spacing={3}>
            {pokemon.children.map((child, index) => (
              <Box key={child.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {renderEvolutions(child)} {/* 마지막 전까지 반복 */}
              </Box>
            ))}
          </Stack>
        ) : null}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Evolutions
      </Typography>
      <Stack sx={{ justifyContent: 'center' }}>
        {evolutions.map((evolution, index) => renderEvolutions(evolution))}
      </Stack>
    </Box>
  );
};

export default EvolutionList;
