'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pokemon } from '@/types/pokemon'
import { useState, useEffect } from 'react'
import PokemonCardSkeleton from './PokemonCardSkeleton'

type PokemonCardProps = {
  pokemon: Pokemon
}



export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = pokemon.image
    if (img.complete) {
      setImageLoaded(true)
    } else {
      img.onload = () => setImageLoaded(true)
    }
  }, [pokemon.image])

  if (!imageLoaded) {
    return <PokemonCardSkeleton />
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative w-full h-48">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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