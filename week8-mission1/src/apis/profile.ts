import { axiosInstance } from "./axios";

export const patchNickname = async (nickname: string) => {
    const { data } = await axiosInstance.patch("/v1/profile/me", { nickname });
    return data;
  };
  