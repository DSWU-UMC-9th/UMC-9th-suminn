import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import SortToggle from "../components/SortToggle";
import LpCard from "../components/LpCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const { data, isPending, isError, refetch } = useGetLpList({
    search,
    order,
  });

  return (
    <div className="px-6 py-8 text-white">
      {/* 검색창 + 정렬 토글 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full sm:w-80 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm
                     placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <SortToggle value={order} onChange={setOrder} />
      </div>

      {/* 로딩 */}
      {isPending && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="animate-pulse rounded-md border border-neutral-800 bg-neutral-900 p-4">
              <div className="aspect-square w-full bg-neutral-800 rounded mb-3" />
              <div className="h-4 w-2/3 bg-neutral-800 rounded mb-2" />
              <div className="h-3 w-1/2 bg-neutral-800 rounded" />
            </li>
          ))}
        </ul>
      )}

      {/* 에러 */}
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

      {/* 데이터 */}
      {!isPending && !isError && (
        <>
          {data?.length ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.map((lp: any) => (
                <li key={lp.id}>
                  <LpCard lp={lp} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-400">표시할 항목이 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
}
