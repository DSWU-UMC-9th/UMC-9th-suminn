// src/page/LpDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MoreHorizontal } from "lucide-react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postLpComment,
  patchLpComment,
  deleteLpComment,
} from "../apis/comment";
import useGetLpComments from "../hooks/queries/useGetLpComments";
import { QUERY_KEY } from "../constants/key";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import type { CommentItem } from "../types/comment";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const numericLpId = Number(lpId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (!numericLpId || Number.isNaN(numericLpId)) return <></>;

  // LP 상세
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: numericLpId });

  // 내 정보
  const { data: me } = useGetMyInfo();

  // 좋아요
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked = !!lp?.data?.likes?.some(
    (like) => like.userId === me?.data?.id,
  );

  const handleLikeLp = () => likeMutate({ lpId: numericLpId });
  const handleDislikeLp = () => disLikeMutate({ lpId: numericLpId });

  // 내가 작성한 LP인지 확인 (필드는 백엔드 스키마에 맞게)
  const lpAuthorId =
    lp?.data?.authorId ?? lp?.data?.author?.id;
  const isMine = !!me && !!lpAuthorId && lpAuthorId === me.data.id;

  // LP 수정/삭제
  const {
    mutate: updateLpMutate,
    isPending: isUpdatingLp,
  } = useUpdateLp(numericLpId);

  const {
    mutate: deleteLpMutate,
    isPending: isDeletingLp,
  } = useDeleteLp(numericLpId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = () => {
    if (!lp) return;
    setEditTitle(lp.data.title);
    setEditContent(lp.data.content);
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;

    updateLpMutate(
      {
        title: editTitle.trim(),
        content: editContent.trim(),
      },
      {
        onSuccess: () => {
          setIsEditMode(false);
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.lps, numericLpId],
          });
        },
      },
    );
  };

  const handleDeleteLp = () => {
    if (!window.confirm("정말 이 LP를 삭제하시겠습니까?")) return;

    deleteLpMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        navigate("/");
      },
    });
  };

  // 댓글 목록
  const {
    data: comments = [],
    isPending: isCommentsLoading,
    isError: isCommentsError,
  } = useGetLpComments(numericLpId);

  // 댓글 작성
  const [newComment, setNewComment] = useState("");

  const { mutate: createCommentMutate, isPending: isCreating } = useMutation({
    mutationFn: (content: string) =>
      postLpComment({ lpId: numericLpId, content }),
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, numericLpId],
      });
    },
  });

  const handleCreateComment = () => {
    if (!newComment.trim()) return;
    createCommentMutate(newComment.trim());
  };

  // 댓글 수정/삭제 상태
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const { mutate: updateCommentMutate, isPending: isUpdatingComment } =
    useMutation({
      mutationFn: ({
        commentId,
        content,
      }: {
        commentId: number;
        content: string;
      }) => patchLpComment({ lpId: numericLpId, commentId, content }),
      onSuccess: () => {
        setEditingId(null);
        setEditingContent("");
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.comments, numericLpId],
        });
      },
    });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: (commentId: number) =>
      deleteLpComment({ lpId: numericLpId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, numericLpId],
      });
    },
  });

  const handleStartEditComment = (commentId: number, current: string) => {
    setEditingId(commentId);
    setEditingContent(current);
    setOpenMenuId(null);
  };

  const handleSaveEditComment = (commentId: number) => {
    if (!editingContent.trim()) return;
    updateCommentMutate({ commentId, content: editingContent.trim() });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutate(commentId);
    setOpenMenuId(null);
  };

  if (isPending || isError || !lp) return <></>;

  return (
    <div className="mt-12 max-w-2xl mx-auto text-white">
      {/* 상단: 제목 + 수정/삭제 */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {isEditMode ? (
          <input
            className="flex-1 rounded-md bg-[#2f3344] px-3 py-2 text-lg font-semibold outline-none focus:ring-2 focus:ring-pink-500"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-2xl font-semibold">{lp.data.title}</h1>
        )}

        {isMine && (
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                <button
                  onClick={saveEdit}
                  disabled={isUpdatingLp}
                  className="px-3 py-1 rounded-md bg-pink-500 text-xs hover:bg-pink-600 disabled:opacity-50"
                >
                  저장
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 rounded-md bg-gray-600 text-xs hover:bg-gray-500"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={startEdit}
                  className="px-3 py-1 rounded-md bg-gray-700 text-xs hover:bg-gray-600"
                >
                  수정
                </button>
                <button
                  onClick={handleDeleteLp}
                  disabled={isDeletingLp}
                  className="px-3 py-1 rounded-md bg-red-500 text-xs hover:bg-red-400 disabled:opacity-50"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* 썸네일 */}
      {lp.data.thumbnail && (
        <img
        src={lp.data.thumbnail}
        alt={lp.data.title}
        className="w-full h-auto max-h-[500px] object-contain rounded-lg mb-4"
      />
      )}

      {/* 내용 */}
      <div className="mb-4">
        {isEditMode ? (
          <textarea
            className="w-full min-h-[120px] rounded-md bg-[#2f3344] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p>{lp.data.content}</p>
        )}
      </div>

      {/* 좋아요 */}
      <div className="flex items-center gap-2 mb-8">
        <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
          <Heart
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "transparent"}
          />
        </button>
        <span className="text-sm text-gray-300">
          {lp.data.likes?.length ?? 0}
        </span>
      </div>

      {/* 댓글 */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-3">Comments</h2>

        {/* 입력 */}
        {me ? (
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 rounded-md bg-[#2f3344] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateComment();
                }
              }}
            />
            <button
              type="button"
              onClick={handleCreateComment}
              disabled={isCreating}
              className="px-4 py-2 rounded-md bg-pink-500 text-sm font-semibold hover:bg-pink-600 disabled:opacity-50"
            >
              등록
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-4">
            댓글을 작성하려면 로그인 해주세요.
          </p>
        )}

        {/* 목록 */}
        {isCommentsLoading ? (
          <p className="text-sm text-gray-400">댓글 불러오는 중...</p>
        ) : isCommentsError ? (
          <p className="text-sm text-red-400">댓글을 불러오지 못했습니다.</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 댓글이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map((comment: CommentItem) => {
              const commentAuthorId =
                comment.authorId ?? comment.author?.id ?? null;
              const isMineComment = !!me && commentAuthorId === me.data.id;
              const isEditingComment = editingId === comment.id;

              return (
                <div
                  key={comment.id}
                  className="flex flex-col gap-1 rounded-md bg-[#1f2230] px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {comment.author?.nickname ?? "익명"}
                    </span>

                    {isMineComment && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === comment.id ? null : comment.id,
                            )
                          }
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {openMenuId === comment.id && (
                          <div className="absolute right-0 mt-1 w-24 rounded-md bg-[#2f3344] text-xs shadow-lg z-10">
                            <button
                              type="button"
                              onClick={() =>
                                handleStartEditComment(
                                  comment.id,
                                  comment.content,
                                )
                              }
                              className="block w-full px-3 py-2 text-left hover:bg-[#3a3f55]"
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteComment(comment.id)
                              }
                              className="block w-full px-3 py-2 text-left text-red-400 hover:bg-[#3a3f55]"
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isEditingComment ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        className="flex-1 rounded-md bg-[#2f3344] px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-pink-500"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEditComment(comment.id)}
                        disabled={isUpdatingComment}
                        className="px-2 py-1 text-xs rounded-md bg-pink-500 hover:bg-pink-600 disabled:opacity-50"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditingContent("");
                        }}
                        className="px-2 py-1 text-xs rounded-md bg-gray-500 hover:bg-gray-600"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm mt-1">{comment.content}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default LpDetailPage;
