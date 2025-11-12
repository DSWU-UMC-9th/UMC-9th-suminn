// src/types/comment.ts
import type { CursorBasedResponse } from "./common";

export type CommentItem = {
  id: number;
  lpId?: number;
  authorId?: number;
  author?: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: string;
  updatedAt?: string;
};


export type ResponseCommentListDto = CursorBasedResponse<CommentItem[]>;
