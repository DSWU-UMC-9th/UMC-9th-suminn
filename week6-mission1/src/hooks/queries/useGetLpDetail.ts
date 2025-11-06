import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useGetLpDetail(lpid: number | string) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpid], 
    queryFn: async () => {
      const res = await getLpDetail(lpid);
      return res?.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
