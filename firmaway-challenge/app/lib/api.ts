import { Pokemon, PokemonDetails } from '@/app/types/pokemon'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(limit = 20): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`)
  const data = await response.json()

  return Promise.all(
    data.results.map(async (pokemon: any) => {
      const detailsResponse = await fetch(pokemon.url)
      const details = await detailsResponse.json()
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
      }
    })
  )
}

export async function fetchPokemonDetails(id: string): Promise<PokemonDetails> {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`)
  const data = await response.json()

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((type: any) => type.type.name),
    abilities: data.abilities.map((ability: any) => ability.ability.name),
    stats: data.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  }
}