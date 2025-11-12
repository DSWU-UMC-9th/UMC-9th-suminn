// src/components/navbar.tsx
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth"; // 닉네임 위해 호출

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [name, setName] = useState<string | null>(null);

  // 로그인 상태일 때만 닉네임 불러오기
  useEffect(() => {
    let mounted = true;
    if (!accessToken) {
      setName(null);
      return;
    }
    (async () => {
      try {
        const res = await getMyInfo();
        if (mounted) setName(res?.data?.name ?? null);
      } catch {
        if (mounted) setName(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [accessToken]);

  return (
    <div className="flex w-full items-center justify-between p-4 bg-black">
      {/* 왼쪽: 로고/타이틀 */}
      <NavLink
        to="/"
        className="text-xl font-extrabold text-pink-500 hover:text-pink-400 transition-colors"
      >
        돌려돌려LP판
      </NavLink>

      {/* 오른쪽: 검색/로그인/회원가입 또는 환영문구/로그아웃 */}
      <div className="ml-auto flex items-center gap-4">
        {/* 검색 아이콘 */}
        <NavLink
          to="/search"
          aria-label="검색"
          className="text-white/90 hover:text-pink-300"
          title="검색"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14"
            />
          </svg>
        </NavLink>

        {!accessToken ? (
          // 비로그인: 로그인/회원가입
          <>
            <NavLink
              to="/login"
              className="text-sm text-white hover:text-pink-300"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="text-sm rounded-md bg-pink-500 px-3 py-1 font-semibold text-white hover:bg-pink-400"
            >
              회원가입
            </NavLink>
          </>
        ) : (
          // 로그인: 환영 문구/로그아웃
          <>
            <span className="hidden sm:block text-sm text-white/90">
              {name ? `${name}님 반갑습니다.` : `반갑습니다.`}
            </span>
            <button
              onClick={logout}
              className="text-sm text-white hover:text-pink-300"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
