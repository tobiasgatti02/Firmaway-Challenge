import { NextRequest, NextResponse } from 'next/server'
import { fetchPokemonList } from '@/lib/api'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const search = searchParams.get('q') || ''

  const pokemonList = await fetchPokemonList(page, limit, search)

  return NextResponse.json(pokemonList, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}