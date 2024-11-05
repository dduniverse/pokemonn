import { create } from 'zustand';

interface PokemonNavigationStore {
  prevPokemonName: string | null;
  nextPokemonName: string | null;
  setPrevPokemonName: (name: string | null) => void;
  setNextPokemonName: (name: string | null) => void;
}

export const usePokemonNavigationStore = create<PokemonNavigationStore>((set) => ({
  prevPokemonName: null,
  nextPokemonName: null,
  setPrevPokemonName: (name) => set({ prevPokemonName: name }),
  setNextPokemonName: (name) => set({ nextPokemonName: name }),
}));
