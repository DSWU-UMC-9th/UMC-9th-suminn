import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";

function useDeleteLp(lpId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteLp(lpId),
    onSuccess: () => {
      // 목록, 상세 캐시 비우고 홈으로 이동
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      queryClient.removeQueries({ queryKey: [QUERY_KEY.lps, lpId] });
      navigate("/");
    },
    onError: (error: any) => {
      console.error("LP 삭제 실패:", error?.response?.data ?? error);
    },
  });
}

export default useDeleteLp;
