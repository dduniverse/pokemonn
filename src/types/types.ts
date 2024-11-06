export interface Type {
    slot: number,
    type: {
        name: string, 
        url: string
    }
}


export interface Pokemon {
    id: number;
    name: string;
}   


export interface GroupedEvolution {
    name: string;
    id: number;
    children?: GroupedEvolution[]; 
}