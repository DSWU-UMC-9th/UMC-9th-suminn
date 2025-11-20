import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      logout();   
      navigate("/"); 
    },
    onError: (error: any) => {
      console.error("로그아웃 실패:", error?.response?.data ?? error);
    },
  });
}

export default useLogout;
