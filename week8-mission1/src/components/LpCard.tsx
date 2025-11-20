import { Link } from "react-router-dom";

type Props = {
  lp: {
    id: number;
    title: string;
    thumbnail?: string;
    createdAt?: string | Date;
    likes?: { id: number }[];
  };
};

function fmt(d?: string | Date) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString();
}

export default function LpCard({ lp }: Props) {
  const likeCnt = lp.likes?.length ?? 0;

  return (
    <Link
      to={`/lps/${lp.id}`}
      className="group block rounded-md overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-pink-600/50 transition"
    >
      {/* 이미지 + 확대 */}
      <div className="relative aspect-square w-full overflow-hidden">
        {lp.thumbnail ? (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-sm">
            No Image
          </div>
        )}

        {/* 오버레이(호버 시 노출) */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="text-sm font-semibold line-clamp-2">{lp.title}</h3>
            <div className="mt-1 flex items-center justify-between text-xs text-white/90">
              <span>{fmt(lp.createdAt)}</span>
              <span>♥ {likeCnt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
