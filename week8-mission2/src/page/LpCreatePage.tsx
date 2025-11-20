import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp, type CreateLpDto } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const LpCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateLpDto) => createLp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QUERY_KEY.lps,
      });
      navigate("/"); 
    },
    onError: (error: any) => {
      console.error("LP 생성 실패:", error?.response?.data ?? error);
    },
  });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (target: string) => {
    setTags((prev) => prev.filter((tag) => tag !== target));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await mutateAsync({
      title,
      content,
      
      thumbnail: thumbnailPreview || "",
      tags,
      published: true,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setThumbnailPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f2028] text-white">
      <div className="relative w-full max-w-md rounded-xl bg-[#252836] p-6 shadow-2xl">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
          aria-label="닫기"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">Create LP</h2>

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


          <div className="flex gap-2">
            <input
              className="flex-1 rounded-md bg-[#2f3344] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 rounded-md bg-pink-500 text-sm font-semibold hover:bg-pink-600"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-[#2f3344] px-2 py-1 text-gray-200"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-400 hover:text-pink-400"
                >
                  x
                </button>
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

export default LpCreatePage;
