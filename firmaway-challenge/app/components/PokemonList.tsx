'use client'

import { useState } from 'react'
import PokemonCard from './PokemonCard'
import PokemonCardSkeleton from './PokemonCardSkeleton'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetchPokemonList } from '@/lib/api'

const ITEMS_PER_PAGE = 20

export default function PokemonList() {
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const { data: pokemonList, error, isLoading } = useSWR(
    [`/api/pokemon?page=${page}&q=${searchQuery}`, page, searchQuery],
    () => fetchPokemonList(page, ITEMS_PER_PAGE, searchQuery)
  )

  if (error) return <div>Failed to load Pokémon</div>

  return (
    <div>
      <div className="grid text-black grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <PokemonCardSkeleton key={index} />
            ))
          : pokemonList?.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-l-md disabled:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}