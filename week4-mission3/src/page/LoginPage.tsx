import { postSignin } from "../apis/auth.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import useForm from "../hooks/useForm.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { type UserSigninInformation, validateSignin } from "../utils/validate.ts";

const LoginPage = () => {
    const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {values, errors, touched, getInputProps} = 
    useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });


    const handleSubmit = async () => {
        try {
          const response = await postSignin(values);
          setItem(response.data.accessToken);
          console.log(response);
        } catch (error: any) {
          alert(error?.message ?? "로그인 중 오류가 발생했습니다.");
        }
      };
      

    //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = 
    Object.values(errors || {}).some((error) => error.length > 0) ||    //오류가 있으면 true
    Object.values(values).some((value) => value === "");                //입력값이 비어있으면 true

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <span className="flex flex-col items-center justify-center font-bold text-2xl p-6">로그인</span>
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.email && touched?.email ? "border-red-500" : "border-gray-300"}`}
                    type={"email"}
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                    {...getInputProps("password")}
                    name="password"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-red-500" : "border-gray-300"}`}
                    type={"password"}
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button 
                    type="button" 
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-black text-white py-3 rounded-md text-lg border font-medium hover:bg-white hover:text-black transition-colors cursor-pointer disabled:bg-gray-300">
                        로그인
                    </button>
            </div>
        </div>
    );
    
};

export default LoginPage;