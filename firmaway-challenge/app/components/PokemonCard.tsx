import Image from 'next/image'
import Link from 'next/link'
import { Pokemon } from '@/types/pokemon'

type PokemonCardProps = {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={200}
        height={200}
        className="w-full h-48 object-contain bg-gray-100"
      />
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