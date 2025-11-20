type Props = { onRetry?: () => void; message?: string };
export default function ErrorBox({ onRetry, message }: Props) {
  return (
    <div className="rounded-md border border-red-500 bg-red-900/40 p-4 text-sm">
      <p className="mb-2">{message ?? "불러오는 중 오류가 발생했습니다."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-400"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
