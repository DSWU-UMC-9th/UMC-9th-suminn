import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const Navbar = () => {
  const { accessToken } = useAuth();
  const { mutate: logoutMutate, isPending: isLogoutLoading } = useLogout();
  const { data: me } = useGetMyInfo();

  const name = me?.data?.name ?? null; 

  return (
    <div className="flex w-full items-center justify-between p-4 bg-black">
      <NavLink
        to="/"
        className="text-xl font-extrabold text-pink-500 hover:text-pink-400 transition-colors"
      >
        돌려돌려LP판
      </NavLink>

      <div className="ml-auto flex items-center gap-4">
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
          <>
            <span className="hidden sm:block text-sm text-white/90">
              {name ? `${name}님 반갑습니다.` : "반갑습니다."}
            </span>
            <button
              onClick={() => logoutMutate()}
              disabled={isLogoutLoading}
              className="text-sm text-white hover:text-pink-300 disabled:opacity-50"
            >
              {isLogoutLoading ? "로그아웃 중..." : "로그아웃"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
