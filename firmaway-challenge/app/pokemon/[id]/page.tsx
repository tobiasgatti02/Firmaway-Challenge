import { fetchPokemonDetails } from '@/app/lib/api'
import PokemonDetails from '@/app/components/PokemonDetails'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonPage({ params }: PageProps) {
  const { id } = await params

  try {
    const pokemon = await fetchPokemonDetails(id)
    return <PokemonDetails pokemon={pokemon} />
  } catch (error) {
    console.error('Failed to fetch Pokemon details:', error)
    notFound()
  }
}