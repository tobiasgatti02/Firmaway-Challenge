'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pokemon } from '@/types/pokemon'
import { useState, useEffect } from 'react'
import PokemonCardSkeleton from './PokemonCardSkeleton'
import { useSearchParams } from 'next/navigation'

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page') || '1'
  const currentType = searchParams.get('type') || ''

  useEffect(() => {
    setImageLoaded(false)
    const img = new window.Image()
    img.src = pokemon.image
    img.onload = () => setImageLoaded(true)
  }, [pokemon.image])

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative w-full h-48">
        {!imageLoaded && <PokemonCardSkeleton />}
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 capitalize">{pokemon.name}</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {pokemon.types.map((type:string) => (
            <span key={type} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
              {type}
            </span>
          ))}
        </div>
        <Link
          href={`/pokemon/${pokemon.id}?page=${currentPage}&type=${currentType}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}