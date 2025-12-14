import type { CommonResponse } from "./common";

// 회원가입
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

// 로그인
export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

// 내 정보 수정 요청 DTO
// (name 필수, bio / avatar 옵션)
export type UpdateMyInfoDto = {
  name: string;
  bio?: string | null;
  avatar?: string | null;
};

// 내 정보 수정 응답은 스펙상 동일 구조라면 ResponseMyInfoDto 재사용
export type ResponseUpdateMyInfoDto = ResponseMyInfoDto;
