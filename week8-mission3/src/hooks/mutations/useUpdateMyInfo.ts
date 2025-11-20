import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth"; 
import { QUERY_KEY } from "../../constants/key";
import type { UpdateMyInfoDto } from "../../types/auth";

function useUpdateMyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMyInfoDto) => updateMyInfo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myinfo] });
    },
    onError: (error: any) => {
      console.error("내 정보 수정 실패:", error?.response?.data ?? error);
    },
  });
}

export default useUpdateMyInfo;
