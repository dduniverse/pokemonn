import { create } from "zustand";
  
// 선택한 포켓몬 정보
interface SelectedStore {
  selectedID: number;
  selectedName: string | null;
  setSelectedID: (id: number) => void;
  setSelectedName: (name: string | null) => void;
}

export const useSelectedStore = create<SelectedStore>((set) => ({
  selectedID: 0,
  selectedName: 'null',
  setSelectedID: (id: number) => set({ selectedID: id }),
  setSelectedName: (name: string | null) => set({ selectedName: name}),
}));