// src/hooks/queries/useInfiniteLpList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";
import type { ResponseLpListDto } from "../../types/lp";

type Params = {
  search?: string;
  order?: PAGINATION_ORDER;
  limit?: number;
  enabled?: boolean;
};

export default function useInfiniteLpList({
  search,
  order,
  limit = 20,
  enabled = true,
}: Params) {
  return useInfiniteQuery<ResponseLpListDto>({
    queryKey: [QUERY_KEY.lps, search ?? "", order ?? "desc"],
    queryFn: ({ pageParam }) =>
        getLpList({
          cursor: pageParam ? Number(pageParam) : undefined,
          search,
          order,
          limit,
        }),
    getNextPageParam: (lastPage) => {
      const box = lastPage?.data;
      if (!box) return undefined;
      return box.hasNext ? box.nextCursor ?? undefined : undefined;
    },
    initialPageParam: undefined, 
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
