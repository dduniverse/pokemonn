import EvolutionTree from './EvolutionTree';
import { GroupedEvolution } from '../../types/types';

interface EvolutionListProps {
  evolutions: GroupedEvolution[];
}

function EvolutionList({ evolutions }: EvolutionListProps) {
  return (
    <div className="mb-4">
      <h5 className="text-xl font-bold mb-4">Evolutions</h5>
      <div className="flex flex-col justify-center">
        {evolutions.map((evolution) => (
          <EvolutionTree key={evolution.id} evolution={evolution} />
        ))}
      </div>
    </div>
  );
}

export default EvolutionList;
