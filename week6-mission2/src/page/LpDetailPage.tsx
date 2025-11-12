import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import SkeletonList from "../components/SkeletonList";
import ErrorBox from "../components/ErrorBox";

import useInfiniteComments from "../hooks/queries/useInfiniteComments";
import SkeletonComment from "../components/SkeletonComment";
import CommentForm from "../components/CommentForm";
import { createComment } from "../apis/comments";

function fmt(d?: string | Date) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString();
}

export default function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const { data, isPending, isError, refetch } = useGetLpDetail(lpid!);

  const {
    data: comments,
    isPending: commentPending,
    isError: commentError,
    refetch: refetchComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments({ lpid: lpid! });

  async function handleCreate(content: string) {
    await createComment({ lpid: lpid!, content });
    await refetchComments();
  }

  if (isPending) return <SkeletonList count={1} />;
  if (isError) return <ErrorBox onRetry={refetch} />;

  const likeCnt = data?.likes?.length ?? 0;

  return (
    <article className="px-6 py-8 max-w-5xl mx-auto text-white">

      <header className="mb-6">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="mt-2 text-sm text-neutral-400 flex items-center gap-3">
          <span>업로드: {fmt(data.createdAt)}</span>
          <span>좋아요: {likeCnt}</span>
        </div>
      </header>

      {data.thumbnail && (
        <div className="mb-6">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full max-h-[480px] object-cover rounded-md border border-neutral-800"
          />
        </div>
      )}

      <section className="prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap leading-7 text-neutral-200">
          {data.content}
        </p>
      </section>

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

      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold">댓글</h2>

        <CommentForm onSubmit={handleCreate} />

        {commentPending && (
          <ul className="space-y-3 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonComment key={`sk-top-${i}`} />
            ))}
          </ul>
        )}

        {commentError && (
          <div className="rounded-md border border-red-500 bg-red-900/40 p-4 text-sm">
            댓글을 불러오는 중 오류가 발생했습니다.
            <button
              onClick={() => refetchComments()}
              className="ml-3 rounded-md bg-pink-600 px-3 py-1.5 text-white hover:bg-pink-500"
            >
              다시 시도
            </button>
          </div>
        )}

        {!commentPending && !commentError && (
          <>
            {comments?.pages?.length ? (
              <>
                <ul className="space-y-3">
                  {comments.pages.map((page, idx) =>
                    page.data?.data.map((c: any) => (
                      <li
                        key={`${idx}-${c.id}`}
                        className="rounded-md border border-neutral-800 bg-neutral-900 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center text-xs">
                            {c.author?.nickname?.slice(0, 2) ?? "유저"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">
                                {c.author?.nickname ?? "익명"}
                              </span>
                              <span className="text-xs text-neutral-400">
                                {fmt(c.createdAt)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm">{c.content}</p>
                            <div className="mt-2 text-xs text-neutral-400">
                              좋아요 {c.likes ?? 0}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                  
                  {isFetchingNextPage &&
                    Array.from({ length: 2 }).map((_, i) => (
                      <SkeletonComment key={`sk-btm-${i}`} />
                    ))}
                </ul>

                {hasNextPage && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="px-5 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-500 disabled:bg-neutral-700 disabled:text-neutral-400 transition"
                    >
                      {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-neutral-400">
                첫 댓글을 작성해보세요.
              </p>
            )}
          </>
        )}
      </section>
    </article>
  );
}
