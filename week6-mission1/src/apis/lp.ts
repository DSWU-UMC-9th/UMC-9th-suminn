import { type PaginationDTO } from "../types/common";
import { axiosInstance } from "./axios";
import { type ResponseLpListDto } from "../types/lp";

export const getLpList = async (
    paginationDto: PaginationDTO,
): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps",{
        params:paginationDto,
    });

    return data;
};

export const getLpDetail = async (lpid: number | string) => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
    return data; // { data: { id, title, content, thumbnail, createdAt, likes, ... } }
  };