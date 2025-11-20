// src/page/LoginPage.tsx
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useLogin from "../hooks/mutations/useLogin";

const LoginPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useLogin();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const {
    values,
    errors,
    touched,
    getInputProps,
  } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = () => {
    if (isDisabled) return;
    loginMutate(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "") ||
    isPending;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <span className="flex flex-col items-center justify-center font-bold text-2xl p-6">
          로그인
        </span>
        <input
          {...getInputProps("email")}
          name="email"
          className={`border w-[300px] p-[10px] rounded-sm
            ${
              errors?.email && touched?.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          className={`border w-[300px] p-[10px] rounded-sm
            ${
              errors?.password && touched?.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-black text-white py-3 rounded-md text-lg border font-medium hover:bg-white hover:text-black transition-colors cursor-pointer disabled:bg-gray-300"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-black text-white py-3 rounded-md text-lg border font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2">
            <img
              className="w-7 h-7"
              src={"/images/google-logo.png"}
              alt="Google Logo"
            />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
