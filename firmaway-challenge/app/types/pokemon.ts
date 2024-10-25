export interface Pokemon {
    id: number
    name: string
    image: string
  }
  
  export interface PokemonDetails extends Pokemon {
    types: string[]
    abilities: string[]
    stats: {
      name: string
      value: number
    }[]
  }