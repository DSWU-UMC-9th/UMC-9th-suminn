// src/hooks/queries/useGetMyInfo.ts
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useGetMyInfo() {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEY.myinfo], 
    queryFn: getMyInfo,
    enabled: !!accessToken,       
  });
}

export default useGetMyInfo;
