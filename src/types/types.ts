export interface Result {
    name: string;
    url: string;
}
  
export interface PokemonEntry {
    entry_number: number;
    pokemon_species: {
        name: string;
        url: string;
    };
}


export interface Type {
    slot: number,
    type: {
        name: string, 
        url: string
    }
}

interface Abilities {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}

interface Stat {
    name: string,
    url: string
}

export interface PokemonDetail {
    id: number,
    name: string,
    height: number,
    weight: number,
    base_experience: number,
    types: Type[],
    stats: Stat[],
    abilities: Abilities[]
}


export interface Pokemon {
    id: number;
    name: string;
}   


export interface GroupedEvolution {
    name: string;
    id: number | null;
    children?: GroupedEvolution[]; 
}