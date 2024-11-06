import PokemonImage from '../common/PokemonImage'; 
import { GroupedEvolution } from '../../types/types'; 
import { useNavigate } from 'react-router-dom';
import { usePokemonPrefetch } from '../../hooks/usePokemonPrefetch';

interface EvolutionBoxProps {
  pokemon: GroupedEvolution;
}

function EvolutionBox({ pokemon }: EvolutionBoxProps) {
  const navigate = useNavigate();
  const prefetchPokemonData = usePokemonPrefetch();

  const handleClick = () => {
    navigate(`/detail/${pokemon.id}`);
  };

  const handleHover = () => {
    prefetchPokemonData(pokemon.id);
  };

  return (
    <div
      className="flex justify-center items-center w-60 rounded-lg p-4 gap-1 transition-transform duration-300 ease-in-out
                 transform hover:scale-105 shadow-sm hover:shadow-lg bg-gray-100 cursor-pointer overflow-hidden"
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      <PokemonImage id={pokemon.id} name={pokemon.name} />
      <p className="font-bold text-lg">{pokemon.name}</p>
    </div>
  );
}

export default EvolutionBox;
