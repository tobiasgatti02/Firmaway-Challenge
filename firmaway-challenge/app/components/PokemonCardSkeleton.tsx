export default function PokemonCardSkeleton() {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-300 aspect-w-1 aspect-h-1"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-10 bg-gray-300 rounded-full w-full"></div>
        </div>
      </div>
    )
  }