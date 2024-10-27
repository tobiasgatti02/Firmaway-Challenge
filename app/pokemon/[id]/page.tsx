'use client'

import { fetchPokemonDetails } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PokemonDetails } from '@/types/pokemon'
import PokemonDetailsSkeleton from '@/app/components/PokemonDetailsSkeleton'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PokemonPage({ params }: PageProps) {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page') || '1'
  const currentType = searchParams.get('type') || ''
  
  const backUrl = `/?page=${currentPage}${currentType ? `&type=${currentType}` : ''}`
  
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const resolvedParams = await params
        const data = await fetchPokemonDetails(resolvedParams.id)
        setPokemon(data)
      } catch (error) {
        console.error('Error loading pokemon:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPokemon()
  }, [params])

  if (loading || !pokemon) {
    return <PokemonDetailsSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={backUrl}
        className="inline-block mb-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
      >
        ← Volver a la lista
      </Link>
      <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold mb-4 capitalize">{pokemon.name}</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Types</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type: string) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map((ability) => (
                  <li key={ability} className="capitalize">
                    {ability}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{stat.name}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(stat.value / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}