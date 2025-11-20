// src/components/Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useDeleteAccount from "../hooks/mutations/useDeleteAccount";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteAccountMutate, isPending } = useDeleteAccount();

  const handleClickWithdraw = () => setIsOpen(true);
  const handleConfirm = () => deleteAccountMutate();

  return (
    <aside
      className="h-full w-56 flex flex-col
                 bg-neutral-950 border-r border-neutral-800
                 px-4 py-6 text-sm text-neutral-200 shadow-xl"
    >
      <nav className="space-y-2">
        <NavLink
          to="/"
          className="block px-3 py-2 rounded hover:bg-neutral-800/60"
        >
          홈
        </NavLink>
        <NavLink
          to="/my"
          className="block px-3 py-2 rounded hover:bg-neutral-800/60"
        >
          마이페이지
        </NavLink>
      </nav>

      <div className="pt-4 border-t border-neutral-800">
        <button
          onClick={handleClickWithdraw}
          disabled={isPending}
          className="w-full text-left px-3 py-2 rounded text-xs text-red-400
                     hover:text-red-300 hover:bg-neutral-800/60 disabled:opacity-50"
        >
          {isPending ? "처리 중..." : "탈퇴하기"}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="w-full max-w-xs rounded-lg bg-[#252836] p-4 text-white">
            <p className="text-sm mb-4">
              정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
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
    </aside>
  );
};

export default Sidebar;
