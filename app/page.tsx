import PokemonList from './components/PokemonList'
import SearchBar from '@/app/components/Searchbar'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <SearchBar />
      <Suspense fallback={<div>Cargando Pokémon...</div>}>
        <PokemonList />
      </Suspense>
    </main>
  )
}