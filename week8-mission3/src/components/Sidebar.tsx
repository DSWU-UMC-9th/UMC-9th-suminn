// src/components/Sidebar.tsx
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useDeleteAccount from "../hooks/mutations/useDeleteAccount";
import useSidebar from "../hooks/useSidebar";

const Sidebar = () => {
  const { isOpen, open, close, toggle } = useSidebar(false);

  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const { mutate: deleteAccountMutate, isPending } = useDeleteAccount();

  const handleClickWithdraw = () => setIsWithdrawOpen(true);
  const handleConfirm = () => deleteAccountMutate();


//3) ESC 키로 Sidebar 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);


  // 4) Sidebar 열릴 때 배경 스크롤 방지

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="fixed top-4 left-4 z-[70] flex h-10 w-10 items-center justify-center
                   rounded-md bg-neutral-900/80 text-neutral-100
                   border border-neutral-700
                   hover:bg-neutral-800 transition-colors"
      >
        <span className="sr-only">사이드바 열기/닫기</span>
        <div className="space-y-1.5">
          <span className="block h-[2px] w-5 bg-neutral-100" />
          <span className="block h-[2px] w-5 bg-neutral-100" />
          <span className="block h-[2px] w-5 bg-neutral-100" />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[40] bg-black/60"
          onClick={close}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-[50]
          w-56 flex flex-col
          bg-neutral-950 border-r border-neutral-800
          px-4 py-6 text-sm text-neutral-200 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition-colors ${
                isActive
                  ? "bg-neutral-800 text-white"
                  : "hover:bg-neutral-800/60"
              }`
            }
            onClick={close}
          >
            홈
          </NavLink>
          <NavLink
            to="/my"
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition-colors ${
                isActive
                  ? "bg-neutral-800 text-white"
                  : "hover:bg-neutral-800/60"
              }`
            }
            onClick={close}
          >
            마이페이지
          </NavLink>
        </nav>

        <div className="mt-auto pt-4 border-t border-neutral-800">
          <button
            onClick={handleClickWithdraw}
            disabled={isPending}
            className="w-full text-left px-3 py-2 rounded text-xs text-red-400
                       hover:text-red-300 hover:bg-neutral-800/60 disabled:opacity-50"
          >
            {isPending ? "처리 중..." : "탈퇴하기"}
          </button>
        </div>
      </aside>

      {isWithdrawOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60">
          <div className="w-full max-w-xs rounded-lg bg-[#252836] p-4 text-white">
            <p className="text-sm mb-4">
              정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsWithdrawOpen(false)}
                className="px-3 py-1 rounded-md bg-gray-600 text-xs hover:bg-gray-500"
              >
                아니오
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="px-3 py-1 rounded-md bg-red-500 text-xs hover:bg-red-400 disabled:opacity-50"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
