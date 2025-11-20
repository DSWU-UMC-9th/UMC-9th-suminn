import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import type { ResponseCommentListDto } from "../../types/comment";

type Params = { lpid: number | string; enabled?: boolean };

export default function useInfiniteComments({ lpid, enabled = true }: Params) {
  return useInfiniteQuery<ResponseCommentListDto>({
    queryKey: ["comments", lpid],
    queryFn: ({ pageParam }) =>
      getComments({
        lpid,
        cursor: pageParam ? Number(pageParam) : undefined, 
      }),
    getNextPageParam: (lastPage) => {
      const box = lastPage?.data;
      if (!box) return undefined;
      return box.hasNext ? box.nextCursor ?? undefined : undefined;
    },
    initialPageParam: undefined,
    enabled,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 10,
  });
}
