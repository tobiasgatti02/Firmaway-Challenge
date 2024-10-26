'use client'

import { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import PokemonCardSkeleton from './PokemonCardSkeleton'
import { useSearchParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetchPokemonList, fetchPokemonTypes } from '@/lib/api'

const ITEMS_PER_PAGE = 20

export default function PokemonList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const searchQuery = searchParams.get('q') || ''
  const selectedType = searchParams.get('type') || ''

  const { data, error, isLoading } = useSWR(
    [`/api/pokemon`, page, searchQuery, selectedType],
    () => fetchPokemonList(page, ITEMS_PER_PAGE, searchQuery, selectedType)
  )

  const { data: pokemonTypes } = useSWR('/api/pokemon/types', fetchPokemonTypes)

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0

  // Efecto para redirigir a la página 1 cuando no hay resultados
  useEffect(() => {
    if (data && data.total === 0 && page > 1) {
      const params = new URLSearchParams(searchParams)
      params.set('page', '1')
      router.push(`/?${params.toString()}`)
    }
  }, [data, page, router, searchParams])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`/?${params.toString()}`)
  }

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('type', type)
    params.set('page', '1')
    router.push(`/?${params.toString()}`)
  }

  if (error) return <div>Error al cargar pokemon</div>

  return (
    <div>
      <div className="mb-4 text-black">
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todos los tipos</option>
          {pokemonTypes?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {data?.total === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No se encontraron Pokémon de este tipo
        </div>
      ) : (
        <>
          <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <PokemonCardSkeleton key={index} />
                ))
              : data?.pokemon.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-l-md disabled:bg-gray-300"
            >
              Anterior
            </button>
            <span className="px-4 py-2 bg-black-200">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md disabled:bg-gray-300"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  )
}