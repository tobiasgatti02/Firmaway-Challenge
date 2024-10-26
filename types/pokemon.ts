export interface Pokemon {
    types: any
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