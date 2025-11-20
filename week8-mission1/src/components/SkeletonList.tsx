export default function SkeletonList({ count = 6 }: { count?: number }) {
    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="animate-pulse rounded-md border border-neutral-800 bg-neutral-900 p-4">
            <div className="aspect-square w-full bg-neutral-800 rounded mb-3" />
            <div className="h-4 w-2/3 bg-neutral-800 rounded mb-2" />
            <div className="h-3 w-1/2 bg-neutral-800 rounded" />
          </li>
        ))}
      </ul>
    );
  }
  