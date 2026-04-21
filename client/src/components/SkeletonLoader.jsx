// Skeleton loader component for product cards
export const ProductCardSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="skeleton h-52 rounded-none" />
    <div className="p-4 space-y-3">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="flex justify-between items-center">
        <div className="skeleton h-5 w-1/4" />
        <div className="skeleton h-8 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

// Generic full-page loader
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4" />
      <p className="text-green-700 font-medium">Loading...</p>
    </div>
  </div>
);

export default ProductCardSkeleton;
