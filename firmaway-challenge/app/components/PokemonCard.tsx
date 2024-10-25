'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pokemon } from '@/types/pokemon'
import { useState } from 'react'

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          className={`object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 capitalize">{pokemon.name}</h2>
        <Link
          href={`/pokemon/${pokemon.id}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}