import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp, type UpdateLpDto } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateLpDto) => updateLp({ lpId, ...payload }),
    onSuccess: () => {
      // 상세 + 리스트 둘 다 새로고침
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
    },
    onError: (error: any) => {
      console.error("LP 수정 실패:", error?.response?.data ?? error);
    },
  });
}

export default useUpdateLp;
