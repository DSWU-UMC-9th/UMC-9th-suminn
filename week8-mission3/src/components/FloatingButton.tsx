import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/create")}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-3xl shadow-lg flex items-center justify-center"
      aria-label="새로 만들기"
    >
      +
    </button>
  );
}