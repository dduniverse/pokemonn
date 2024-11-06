import { Type } from '../types/types';
import PokemonImage from './common/PokemonImage';
import TypeChip from './common/TypeChip';
import StatBox from './common/StatBox';


const PokemonInfo = ({ pokemonData }: { pokemonData: any }) => (
  <div className="flex justify-center items-center bg-gray-200 gap-8 rounded-md p-4">
    <PokemonImage id={pokemonData.id} name={pokemonData.name} />
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row gap-2 pb-2">
        <StatBox label="Height" value={`${pokemonData.height / 10}m`} />
        <StatBox label="Weight" value={`${pokemonData.weight / 10}kg`} />
      </div>
      <div className="flex flex-row gap-2">
        {pokemonData.types.map((type: Type) => (
          <TypeChip key={type.type.name} type={type} /> 
        ))}
      </div>
    </div>
  </div>
);

export default PokemonInfo;
