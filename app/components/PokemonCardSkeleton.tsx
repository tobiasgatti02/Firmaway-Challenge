export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-14 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-full w-full animate-pulse"></div>
      </div>
    </div>
  )
}