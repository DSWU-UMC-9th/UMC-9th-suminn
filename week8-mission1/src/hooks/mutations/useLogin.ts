import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { UserSigninInformation } from "../../utils/validate";

function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: UserSigninInformation) => login(body),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: any) => {
      console.error("로그인 실패:", error?.response?.data ?? error);
      alert("로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.");
    },
  });
}

export default useLogin;
