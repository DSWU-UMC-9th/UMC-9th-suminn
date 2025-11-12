import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!accessToken) setOpen(true);
  }, [accessToken]);

  const goLogin = () =>
    navigate("/login", { replace: true, state: { from: location } });
  const goHome = () => navigate("/", { replace: true });

  if (accessToken) return <Outlet />;


  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-lg bg-neutral-900 border border-neutral-700 p-5 text-white shadow-xl">
            <h3 className="text-lg font-semibold">로그인이 필요합니다</h3>
            <p className="mt-2 text-sm text-neutral-300">
              이 페이지는 로그인 사용자만 이용할 수 있어요. 로그인하시겠습니까?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={goHome}
                className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm"
              >
                취소
              </button>
              <button
                onClick={goLogin}
                className="px-3 py-1.5 rounded-md bg-pink-600 hover:bg-pink-500 text-sm"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
