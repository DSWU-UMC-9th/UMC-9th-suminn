import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import SortToggle from "../components/SortToggle";
import LpCard from "../components/LpCard";
import useInfiniteLpList from "../hooks/queries/useInfiniteLpList";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/queries/useDebounce";
import useThrottle from "../hooks/queries/useThrottle";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [touched, setTouched] = useState(false);

  const debouncedValue = useDebounce(search, 300);

  const [scrollY, setScrollY] = useState(0);

  const throttledScrollY = useThrottle(scrollY, 3000);

  const isSearchEnabled = !touched || debouncedValue.trim().length > 0;

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteLpList({
    search: debouncedValue,
    order,
    enabled: isSearchEnabled,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollPosition = window.innerHeight + throttledScrollY;
    const threshold = document.documentElement.scrollHeight - 200;

    if (scrollPosition >= threshold) {
      fetchNextPage();
    }
  }, [throttledScrollY, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 렌더링 확인용
  useEffect(() => {
    console.log("HomePage 렌더됨", { throttledScrollY });
  }, [throttledScrollY]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <main className="flex-1 px-6 py-8">
        {/* 검색 + 정렬 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <input
            value={search}
            onChange={(e) => {
              if (!touched) setTouched(true);
              setSearch(e.target.value);
            }}
            placeholder="검색어를 입력하세요"
            className="w-full sm:w-80 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm
                     placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <SortToggle value={order} onChange={setOrder} />
        </div>

        {/* 로딩 상태 */}
        {isPending && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={`sk-top-${i}`} />
            ))}
          </ul>
        )}

        {/* 에러 상태 */}
        {isError && (
          <div className="rounded-md border border-red-500 bg-red-900/40 p-4 text-sm">
            <p className="mb-2">목록을 불러오는 중 오류가 발생했습니다.</p>
            <button
              onClick={() => refetch()}
              className="rounded-md bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-400"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 데이터 렌더링 */}
        {!isPending && !isError && (
          <>
            {data?.pages && data.pages.length > 0 ? (
              <>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {data.pages.map((page, pageIndex) =>
                    page.data.data.map((lp: any) => (
                      <li key={`${pageIndex}-${lp.id}`}>
                        <LpCard lp={lp} />
                      </li>
                    )),
                  )}

                 
                  {isFetchingNextPage &&
                    Array.from({ length: 5 }).map((_, i) => (
                      <SkeletonCard key={`sk-bottom-${i}`} />
                    ))}
                </ul>

                {!hasNextPage && (
                  <p className="text-center text-neutral-400 mt-8 text-sm">
                    모든 항목을 불러왔습니다.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-neutral-400">
                표시할 항목이 없습니다.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
