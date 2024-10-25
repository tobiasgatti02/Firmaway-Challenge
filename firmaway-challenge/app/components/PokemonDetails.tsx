import Image from 'next/image'
import Link from 'next/link'
import { PokemonDetails as PokemonDetailsType } from '@/types/pokemon'

type PokemonDetailsProps = {
  pokemon: PokemonDetailsType
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Pokédex
      </Link>
      <div className="bg-white  text-black rounded-lg shadow-md overflow-hidden ">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100 p-4">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Types</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                <ul className="list-disc list-inside">
                  {pokemon.abilities.map((ability) => (
                    <li key={ability} className="capitalize">
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>
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