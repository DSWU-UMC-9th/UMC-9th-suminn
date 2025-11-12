import { axiosInstance } from "./axios";
import type { ResponseCommentListDto } from "../types/comment";

type ListParams = {
  lpid: number | string;
  cursor?: number;
  limit?: number;
};

export async function getComments(params: ListParams): Promise<ResponseCommentListDto> {
  const { lpid, cursor, limit = 10 } = params;
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
    params: { cursor, limit },
  });
  return data;
}

type CreateParams = {
  lpid: number | string;
  content: string;
};

export async function createComment({ lpid, content }: CreateParams) {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, { content });
  return data;
}