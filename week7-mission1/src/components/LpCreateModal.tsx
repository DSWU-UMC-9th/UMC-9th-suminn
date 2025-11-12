// src/components/LpCreateModal.tsx
import { useState, type FormEvent, type MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp, type CreateLpDto } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

type LpCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LpCreateModal = ({ isOpen, onClose }: LpCreateModalProps) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateLpDto) => createLp(payload),
    onSuccess: () => {
      // LP 리스트 리페치
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTagInput("");
    setTags([]);
    setThumbnailPreview("");
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await mutateAsync({
      title,
      content,
      thumbnail: thumbnailPreview || "https://via.placeholder.com/300x300", // 임시
      tags,
      published: true,
    });
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 현재 API는 thumbnail을 URL로 받으므로,
    // 여기서는 미리보기만 구현해두고,
    // 실제 업로드는 백엔드 스펙에 맞게 FormData/업로드 API 붙이시면 됩니다.
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setThumbnailPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-md rounded-xl bg-[#252836] p-6 text-white shadow-2xl"
        onClick={stopPropagation}
      >
        {/* 상단 X 버튼 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add LP</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* LP 이미지 프리뷰 */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center overflow-hidden">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="LP Thumbnail"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">LP Image</span>
            )}
          </div>
          <label className="text-xs cursor-pointer text-gray-300 hover:text-white">
            LP 이미지 선택
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="w-full rounded-md bg-[#2f3344] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full rounded-md bg-[#2f3344] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Tag 입력 + Add 버튼 */}
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-md bg-[#2f3344] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 rounded-md bg-pink-500 text-sm font-semibold hover:bg-pink-600"
            >
              Add
            </button>
          </div>

          {/* Tag 리스트 */}
          <div className="flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#2f3344] px-2 py-1 text-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full rounded-md bg-pink-500 py-2 text-sm font-semibold hover:bg-pink-600 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Add LP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;
