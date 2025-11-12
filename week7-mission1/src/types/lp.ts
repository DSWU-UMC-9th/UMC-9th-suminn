import { type CommonResponse, type CursorBasedResponse } from "./common";

export type Tag = {
    id:number;
    name: string;
};

export type Likes =  {
    id: number;
    userId: number;
    lpId:number;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number; 
    author?: {
      id: number;
      name: string;
      email: string;
      bio: string | null;
      avatar: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Likes[];
  };
  
export type RequestLpDto = {
    lpId:number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLpListDto = CursorBasedResponse<{
    data: Lp[];
    nextCursor?: number | string | null;
    hasNext?: boolean;
  }>;

export type ResponseLikeLpDto = CommonResponse<{
    id:number;
    userId: number;
    lpId: number;
}>;