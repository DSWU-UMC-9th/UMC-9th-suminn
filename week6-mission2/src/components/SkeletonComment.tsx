export default function SkeletonComment() {
    return (
      <li className="animate-pulse rounded-md border border-neutral-800 bg-neutral-900 p-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-800" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-neutral-800 rounded mb-2" />
            <div className="h-3 w-3/4 bg-neutral-800 rounded mb-1" />
            <div className="h-3 w-2/3 bg-neutral-800 rounded" />
          </div>
        </div>
      </li>
    );
  }