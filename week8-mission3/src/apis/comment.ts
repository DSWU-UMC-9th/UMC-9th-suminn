import { axiosInstance } from "./axios";
import type { ResponseCommentListDto, CommentItem } from "../types/comment";
import type { CommonResponse } from "../types/common";

// ✅ 댓글 목록 조회
export const getLpComments = async (lpId: number): Promise<CommentItem[]> => {
  const { data } = await axiosInstance.get<ResponseCommentListDto>(
    `/v1/lps/${lpId}/comments`,
  );

  // data: ResponseCommentListDto
  // data.data: { data: CommentItem[]; nextCursor; hasNext }
  // data.data.data: CommentItem[]
  return data.data.data;
};

// ✅ 댓글 생성
export const postLpComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}): Promise<CommentItem> => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${lpId}/comments`,
    { content },
  );

  if ((data as CommonResponse<CommentItem>).data) {
    return (data as CommonResponse<CommentItem>).data;
  }
  return data as CommentItem;
};

// ✅ 댓글 수정
export const patchLpComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}): Promise<CommentItem> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content },
  );

  if ((data as CommonResponse<CommentItem>).data) {
    return (data as CommonResponse<CommentItem>).data;
  }
  return data as CommentItem;
};

// ✅ 댓글 삭제
export const deleteLpComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};
