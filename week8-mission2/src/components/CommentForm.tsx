import { useState } from "react";

type Props = {
  onSubmit: (content: string) => Promise<void> | void;
  maxLength?: number;
};

export default function CommentForm({ onSubmit, maxLength = 300 }: Props) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const trimmed = value.trim();
  const tooShort = trimmed.length > 0 && trimmed.length < 2;
  const tooLong = value.length > maxLength;
  const disabled = submitting || trimmed.length < 2 || tooLong;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;
    try {
      setSubmitting(true);
      await onSubmit(trimmed);
      setValue("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="댓글을 입력하세요 (2자 이상)"
        className="w-full min-h-24 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        maxLength={maxLength + 50} 
      />
      <div className="flex items-center justify-between text-xs">
        <div className="h-5">
          {tooShort && <span className="text-red-400">2자 이상 입력해주세요.</span>}
          {tooLong && <span className="text-red-400">최대 {maxLength}자까지 작성할 수 있어요.</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-neutral-400 ${tooLong ? "text-red-400" : ""}`}>
            {value.length} / {maxLength}
          </span>
          <button
            type="submit"
            disabled={disabled}
            className="rounded-md bg-pink-600 px-3 py-1.5 text-white hover:bg-pink-500 disabled:bg-neutral-700 disabled:text-neutral-400 transition"
          >
            {submitting ? "등록 중…" : "등록"}
          </button>
        </div>
      </div>
    </form>
  );
}
