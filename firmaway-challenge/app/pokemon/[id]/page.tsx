import { fetchPokemonDetails } from '@/lib/api'
import PokemonDetails from '@/app/components/PokemonDetails'
import PokemonDetailsSkeleton from '@/app/components/PokemonDetailsSkeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonPage({ params }: PageProps) {
  const { id } = await params

  return (
    <Suspense fallback={<PokemonDetailsSkeleton />}>
      <PokemonDetailsWrapper id={id} />
    </Suspense>
  )
}

async function PokemonDetailsWrapper({ id }: { id: string }) {
  try {
    const pokemon = await fetchPokemonDetails(id)
    return <PokemonDetails pokemon={pokemon} />
  } catch (error) {
    console.error('Failed to fetch Pokemon details:', error)
    notFound()
  }
}