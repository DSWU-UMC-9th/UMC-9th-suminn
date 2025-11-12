export default function SkeletonCard() {
    return (
      <li className="animate-pulse-slow rounded-md border border-neutral-800 bg-neutral-900 p-4">
        <div className="aspect-square w-full bg-neutral-800 rounded mb-3" />
        <div className="h-4 w-3/4 bg-neutral-800 rounded mb-2" />
        <div className="h-3 w-1/2 bg-neutral-800 rounded" />
      </li>
    );
  }