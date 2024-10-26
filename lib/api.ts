import { Pokemon, PokemonDetails } from '@/types/pokemon'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(page = 1, limit = 20, search = '', type = ''): Promise<{ pokemon: Pokemon[], total: number }> {
  let allPokemon: Pokemon[] = []

  if (type) {
    const typeResponse = await fetch(`${API_BASE_URL}/type/${type}`, {
      next: { revalidate: 3600 }
    })
    const typeData = await typeResponse.json()
    allPokemon = await Promise.all(
      typeData.pokemon.map(async (p: any) => {
        const response = await fetch(p.pokemon.url, {
          next: { revalidate: 3600 }
        })
        const data = await response.json()
        return {
          id: data.id,
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          types: data.types.map((t: any) => t.type.name),
        }
      })
    )
  } else {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=1000`, {
      next: { revalidate: 3600 }
    })
    const data = await response.json()
    allPokemon = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const detailsResponse = await fetch(pokemon.url, {
          next: { revalidate: 3600 }
        })
        const details = await detailsResponse.json()
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other['official-artwork'].front_default,
          types: details.types.map((t: any) => t.type.name),
        }
      })
    )
  }

  if (search) {
    allPokemon = allPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  const total = allPokemon.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPokemon = allPokemon.slice(startIndex, endIndex)

  return { pokemon: paginatedPokemon, total }
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

export async function fetchPokemonTypes(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/type`, {
    next: { revalidate: 86400 } // Cache for 24 hours
  })
  const data = await response.json()
  return data.results.map((type: any) => type.name)
}