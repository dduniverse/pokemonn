import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import EvolutionBox from './EvolutionBox';
import { GroupedEvolution } from '../../types/types';

interface EvolutionTreeProps {
  evolution: GroupedEvolution;
}

function EvolutionTree({ evolution }: EvolutionTreeProps) {
  const { id, children } = evolution;
  const childrenLength = children?.length ?? 0;

  return (
    <div className="flex flex-row justify-center items-center gap-12">
      {id !== null && <EvolutionBox pokemon={evolution} />}
      
      {childrenLength > 0 && (
        <ArrowForwardIcon className="text-gray-400" style={{ fontSize: '2rem' }} />
      )}
      
      {children?.length ? (
        <div className="flex flex-col space-y-12">
          {children.map((child) => (
            <EvolutionTree key={child.id} evolution={child} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default EvolutionTree;
