import { ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getIdFromUrl } from '../utils/urlUtils';
import PokemonImage from './common/PokemonImage';
import PokemonInfo from './common/PokemonInfo';
import { LoadingSkeletonCard } from './common/LoadingSkeleton';
import { ErrorDisplay } from './common/ErrorDisplay';
import { PokemonDetailType, PokemonEntryType, ResultType } from '../types/schemas';

interface PropsList {
  pokemonData: PokemonEntryType[] | ResultType[];
  additionalData: Record<string, PokemonDetailType>;
  isLoading: boolean;
  error: Error | unknown;
}

function List({ pokemonData, additionalData, isLoading, error }: PropsList) {
  const navigate = useNavigate();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const cols = isXs ? 2 : isSm ? 3 : 4;

  const handleClick = (id: number) => navigate(`/detail/${id}`);
  
  const getPokemonIdAndName = (data: PokemonEntryType | ResultType): { id: number; name: string } => {
    const isRegionData = 'pokemon_species' in data;
    const id = 'id' in data ? Number(data.id) : Number(getIdFromUrl(isRegionData ? data.pokemon_species.url : data.url));
    const name = isRegionData ? data.pokemon_species.name : data.name;
    return { id, name };
  };


  if (isLoading) return <LoadingSkeletonCard cols={cols} />;
  if (error) return <ErrorDisplay />;

  return (
    <ImageList cols={cols} rowHeight="auto" sx={{ overflow: 'hidden', padding: '1em' }}>
      {pokemonData.map((data) => {
        const { id, name } = getPokemonIdAndName(data);
        const additionalInfo = additionalData[name.toLowerCase()];
        const types = additionalInfo && 'types' in additionalInfo ? additionalInfo.types : [];

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
            onClick={() => handleClick(id)}
          >
             <div className="pt-2 text-xs md:text-base">
              No.  <span className="font-bold text-base">{id}</span>
            </div>
            <PokemonImage id={id} name={name} width={isXs ? 60 : 100} height={isXs ? 60 : 100} />
            <span className="text-sm md:text-lg font-bold pb-2">{name}</span>
            {types.length > 0 && (
              <PokemonInfo pokemonData={additionalInfo} />
            )}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default List;
