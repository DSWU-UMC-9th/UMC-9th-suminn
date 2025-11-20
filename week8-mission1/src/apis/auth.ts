import { type RequestSignupDto, type RequestSigninDto, type ResponseSignupDto, type ResponseSigninDto, type ResponseMyInfoDto, type UpdateMyInfoDto, type ResponseUpdateMyInfoDto} from "../types/auth";
import { axiosInstance } from "./axios";
import type { CommonResponse } from "../types/common";
  
  // 회원가입
  export const postSignup = async (
    body: RequestSignupDto,
  ): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
  };
  
  // 로그인
  export const postSignin = async (
    body: RequestSigninDto,
  ): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    return data;
  };
  
  // 내 정보 조회
  export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users/me");
    return data;
  };
  
  // 로그아웃
  export const postLogout = async () => {
    const { data } = await axiosInstance.post("/v1/auth/signout");
    return data;
  };
  
  // 내 정보 수정
  export const updateMyInfo = async (
    payload: UpdateMyInfoDto,
  ): Promise<ResponseUpdateMyInfoDto> => {
    const { data } = await axiosInstance.patch<CommonResponse<any>>(
      "/v1/users",
      payload,
    );
    return data as ResponseUpdateMyInfoDto;
  };

  //탈퇴
  export const deleteAccount = async () => {
    const { data } = await axiosInstance.delete("/v1/users");
    return data;
  };