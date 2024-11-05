// evolutionUtils.ts
import { GroupedEvolution } from '../types/types';
import { getIdFromUrl } from './urlUtils';

export const extractEvolutionData = (chain: any): GroupedEvolution[] => {
  const evolutionData: GroupedEvolution[] = [];

  const traverseChain = (data: any): GroupedEvolution | null => {
    if (!data?.species?.name || !data?.species?.url) {
      console.warn("Invalid evolution data:", data);
      return null;  // species 정보가 없으면 해당 진화 단계를 무시
    }

    const speciesName = data.species.name;
    const speciesId = getIdFromUrl(data.species.url);

    const currentEvolution: GroupedEvolution = {
      name: speciesName,
      id: speciesId,
      children: [],
    };

    // evolves_to 배열이 없을 경우 기본값을 빈 배열로 설정
    (data.evolves_to ?? []).forEach((nextEvolution: any) => {
      const childEvolution = traverseChain(nextEvolution);
      if (childEvolution) {
        currentEvolution.children = currentEvolution.children || []; // children이 undefined이면 빈 배열로 초기화
        currentEvolution.children.push(childEvolution); // 유효한 자식만 추가
      }
    });

    return currentEvolution;
  };

  // 루트부터 진화 포켓몬 찾기
  const rootEvolution = traverseChain(chain);
  if (rootEvolution) {
    evolutionData.push(rootEvolution);
  }

  return evolutionData;
};
