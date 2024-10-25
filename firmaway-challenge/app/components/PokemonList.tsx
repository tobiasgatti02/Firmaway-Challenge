'use client'

import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import { fetchPokemonList } from '@/app/lib/api'
import { Pokemon } from '../types/pokemon'

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonList()
        setPokemonList(data)
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemon()
  }, [])

  if (isLoading) {
    return <div className="text-center">Loading Pokémon...</div>
  }

  return (
    <div className="grid text-black grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}