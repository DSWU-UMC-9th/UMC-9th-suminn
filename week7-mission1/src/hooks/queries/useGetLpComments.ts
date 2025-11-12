// src/hooks/queries/useGetLpComments.ts
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpComments } from "../../apis/comment";
import type { CommentItem } from "../../types/comment";

function useGetLpComments(lpId: number) {
  return useQuery<CommentItem[]>({
    queryKey: [QUERY_KEY.comments, lpId],
    queryFn: () => getLpComments(lpId),
    enabled: !!lpId,
  });
}

export default useGetLpComments;
