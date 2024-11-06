import { Type } from '../../types/types';
import TypeChip from './TypeChip';
import StatBox from './StatBox';


const PokemonInfo = ({ pokemonData }: { pokemonData: any }) => (
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
);

export default PokemonInfo;
