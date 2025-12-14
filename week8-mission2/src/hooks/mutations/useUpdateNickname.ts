import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchNickname } from "../../apis/profile";
import { QUERY_KEY } from "../../constants/key";

export default function useUpdateNickname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => patchNickname(nickname),

    onMutate: async (newNickname) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myinfo] });

      const previous = queryClient.getQueryData([QUERY_KEY.myinfo]);

      queryClient.setQueryData([QUERY_KEY.myinfo], (old: any) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            
            name: newNickname,

          },
        };
      });

      return { previous };
    },

    // 실패하면 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([QUERY_KEY.myinfo], ctx.previous);
      }
    },

    // 성공/실패 상관없이 서버 값 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myinfo] });
    },
  });
}
