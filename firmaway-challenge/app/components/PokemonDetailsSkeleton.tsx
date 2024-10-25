export default function PokemonDetailsSkeleton() {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-300 p-4">
            <div className="w-full h-64 bg-gray-400"></div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-6 w-16 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded w-3/4"></div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }