// src/pages/LpDetailPage.tsx
import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import SkeletonList from "../components/SkeletonList";
import ErrorBox from "../components/ErrorBox";

function fmt(d?: string | Date) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString();
}

export default function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const { data, isPending, isError, refetch } = useGetLpDetail(lpid!);

  if (isPending) return <SkeletonList count={1} />;
  if (isError) return <ErrorBox onRetry={refetch} />;

  const likeCnt = data?.likes?.length ?? 0;

  return (
    <article className="px-6 py-8 max-w-5xl mx-auto text-white">
      {/* 상단 메타 */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="mt-2 text-sm text-neutral-400 flex items-center gap-3">
          <span>업로드: {fmt(data.createdAt)}</span>
          <span>좋아요: {likeCnt}</span>
        </div>
      </header>

      {/* 썸네일 */}
      {data.thumbnail && (
        <div className="mb-6">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full max-h-[480px] object-cover rounded-md border border-neutral-800"
          />
        </div>
      )}

      {/* 본문 */}
      <section className="prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap leading-7 text-neutral-200">
          {data.content}
        </p>
      </section>

      {/* 액션 버튼 */}
      <footer className="mt-8 flex gap-2">
        <button className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-3 py-2 text-sm">
          좋아요
        </button>
        <button className="rounded-md bg-neutral-800 hover:bg-neutral-700 px-3 py-2 text-sm">
          수정
        </button>
        <button className="rounded-md bg-red-600 hover:bg-red-500 px-3 py-2 text-sm">
          삭제
        </button>
      </footer>
    </article>
  );
}
