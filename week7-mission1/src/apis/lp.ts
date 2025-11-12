import { axiosInstance } from "./axios";
import {type PaginationDTO} from "../types/common";
import {type ResponseLpListDto,type RequestLpDto,type ResponseLpDto, type ResponseLikeLpDto} from "../types/lp";
import type { CommonResponse } from "../types/common";

export const getLpList = async (
  paginationDto: PaginationDTO,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getLpDetail = async (
  { lpId }: RequestLpDto,
): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const postLike = async (
    { lpId }: RequestLpDto,
  ): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    return data;
  };

  export const deleteLike = async (
    { lpId }: RequestLpDto,
  ): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
  };

  export type CreateLpDto = {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  };
  
  export const createLp = async (payload: CreateLpDto): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.post("/v1/lps", payload);
    return data;
  };

  // LP 수정용 DTO (필요한 필드만 partial 로)
export type UpdateLpDto = {
    title?: string;
    content?: string;
    thumbnail?: string;
    tags?: string[];
    published?: boolean;
  };
  
  // ✅ LP 수정: PATCH /v1/lps/:lpId
  export const updateLp = async ({
    lpId,
    ...payload
  }: UpdateLpDto & { lpId: number }): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.patch<CommonResponse<any>>(
      `/v1/lps/${lpId}`,
      payload,
    );
    return data as ResponseLpDto;
  };
  
  // ✅ LP 삭제: DELETE /v1/lps/:lpId
  export const deleteLp = async (lpId: number): Promise<void> => {
    await axiosInstance.delete(`/v1/lps/${lpId}`);
  };