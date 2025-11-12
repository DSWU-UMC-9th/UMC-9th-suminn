import { type CursorBasedResponse } from "./common";

export type CommentItem = {
  id: number;
  author: { id: number; nickname: string };
  content: string;
  createdAt: string; 
};

export type ResponseCommentListDto = CursorBasedResponse<{
  data: CommentItem[];
  nextCursor?: number | string | null;
  hasNext?: boolean;
}>;
