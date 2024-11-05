import { Box, ImageList, ImageListItem, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getIdFromUrl } from '../utils/urlUtils';
import { PokemonDetail, PokemonEntry, Result } from '../types/types';
import { useSelectedStore } from '../store/useSelectedStore';
import TypeChip from './common/TypeChip';
import StatBox from './common/StatBox';
import PokemonImage from './common/PokemonImage';

interface PropsList {
  pokemonData: PokemonEntry[] | Result[] | PokemonDetail[];
  additionalData: Record<string, PokemonDetail>;
  isLoading: boolean;
  error: Error | unknown;
}

const PokemonInfo = ({ id, name, types, height, weight, isXs }: any) => (
  <Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', justifyContent: 'center', paddingBottom: '0.6em' }}>
      {types.map((type: any) => (
        <TypeChip key={type.type.name} type={type} />
      ))}
    </Box>
    <Stack direction="row" spacing={1} sx={{ paddingBottom: '0.6em', fontSize: isXs ? '0.6em' : '1em' }}>
      <StatBox label="Height" value={`${height / 10}m`} />
      <StatBox label="Weight" value={`${weight / 10}kg`} />
    </Stack>
  </Box>
);

function List({ pokemonData, additionalData, isLoading, error }: PropsList) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const { setSelectedID, setSelectedName } = useSelectedStore();
  const cols = isXs ? 2 : isSm ? 3 : 4;

  const handleClick = (id: number, name: string) => {
    setSelectedID(id);
    setSelectedName(name);
    navigate(`/detail/${id}`);
  };

  const hasId = (obj: any): obj is { id: number } => typeof obj.id === 'number';

  if (isLoading) {
    return (
      <ImageList cols={cols} rowHeight="auto" sx={{ overflow: 'hidden', padding: '1em' }}>
        {[...Array(8)].map((_, index) => (
          <ImageListItem key={index}>
            <Skeleton variant="rectangular" height={170} sx={{ borderRadius: '12px', marginBottom: 1 }} />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  if (error) {
    return <div>No data.</div>;
  }

  return (
    <ImageList cols={cols} rowHeight="auto" sx={{ overflow: 'hidden', padding: '1em' }}>
      {pokemonData.map((data) => {
        const isRegionData = 'pokemon_species' in data;
        const id = hasId(data) ? data.id : getIdFromUrl(isRegionData ? data.pokemon_species.url : data.url);
        const name = isRegionData ? data.pokemon_species.name : data.name;
        const additionalInfo = additionalData[name.toLowerCase()];
        const types = additionalInfo ? additionalInfo.types : ('types' in data ? data.types : []);
        const height = additionalInfo ? additionalInfo.height : ('height' in data ? data.height: '');
        const weight = additionalInfo ? additionalInfo.weight : ('weight' in data? data.weight: '');

        return (
          <ImageListItem
            key={id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.01)',
                boxShadow: '0 3px 12px rgba(0, 0, 0, 0.3)',
              },
              backgroundColor: '#F9F9F9',
              overflow: 'hidden',
              cursor: 'pointer',
              p: isXs ? 1 : 2,
            }}
            onClick={() => handleClick(id, name)}
          >
            <Box component="span" sx={{ paddingTop: '0.6em', fontSize: isXs ? '0.6em' : '1em' }}>
              No. <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1em' }}>{id}</Box>
            </Box>
            <PokemonImage id={id} name={name} width={isXs ? 60 : 100} height={isXs ? 60 : 100} />
            <Box component="span" sx={{ fontSize: isXs ? '0.8em' : '1.2em', fontWeight: 'bold', paddingBottom: '0.6em' }}>{name}</Box>
            {types.length > 0 && (
              <PokemonInfo id={id} name={name} types={types} height={height} weight={weight} isXs={isXs} />
            )}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default List;
