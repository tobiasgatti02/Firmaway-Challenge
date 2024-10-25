import { Pokemon, PokemonDetails } from '@/types/pokemon'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(page = 1, limit = 20, search = ''): Promise<Pokemon[]> {
  const offset = (page - 1) * limit
  const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`, {
    next: { revalidate: 3600 } 
  })
  const data = await response.json()

  const pokemonList = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const detailsResponse = await fetch(pokemon.url, {
        next: { revalidate: 3600 } 
      })
      const details = await detailsResponse.json()
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
      }
    })
  )

  if (search) {
    return pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  return pokemonList
}

export async function fetchPokemonDetails(id: string): Promise<PokemonDetails> {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`, {
    next: { revalidate: 3600 } 
  })
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