import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useDeleteAccount() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      logout();         // 토큰/상태 제거
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("탈퇴 실패:", error?.response?.data ?? error);
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    },
  });
}

export default useDeleteAccount;
