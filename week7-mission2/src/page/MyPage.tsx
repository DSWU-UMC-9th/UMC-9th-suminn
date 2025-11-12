// src/page/MyPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";

import myImage from "../img.png"; // 기본 프로필 이미지

const MyPage = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();

  // ✅ 내 정보 조회 (react-query)
  const {
    data: me,
    isPending,
    isError,
  } = useGetMyInfo(accessToken);

  // ✅ 설정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const { mutate: updateMyInfoMutate, isPending: isUpdating } =
    useUpdateMyInfo();

  // me 응답 들어오면 폼 초기값 세팅
  useEffect(() => {
    if (me?.data) {
      setName(me.data.name ?? "");
      setBio(me.data.bio ?? "");
      setAvatar(me.data.avatar ?? "");
    }
  }, [me]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {
    if (!name.trim()) {
      // name은 필수라고 가정
      return;
    }

    updateMyInfoMutate(
      {
        name: name.trim(),
        bio: bio.trim() || null, // ✅ 옵션: 비어있으면 null
        avatar: avatar.trim() || null, // ✅ 옵션: 비어있으면 null
      },
      {
        onSuccess: () => {
          setIsEditMode(false);
        },
      },
    );
  };

  if (!accessToken) {
    // 비로그인 접근 시 처리 (원하는 UX에 맞게 수정 가능)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
        <p>로그인이 필요합니다.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-pink-500 px-4 py-2 rounded-md"
        >
          로그인 하러 가기
        </button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        내 정보 불러오는 중...
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        내 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const user = me.data;

  const displayAvatar = avatar || user.avatar || myImage;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-white">
      <h1 className="text-xl font-semibold">
        {user.name}님 환영합니다.
      </h1>

      <div className="flex flex-col items-center gap-3 bg-[#1f2230] px-6 py-6 rounded-xl shadow-lg min-w-[280px]">
        {/* 프로필 이미지 */}
        <img
          src={displayAvatar}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full mb-2 object-cover border border-gray-600"
        />

        {/* 기본 정보 */}
        {!isEditMode ? (
          <>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-400 mt-2">
              {user.bio || "소개글이 없습니다."}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-pink-500 px-4 py-2 rounded-md text-sm font-semibold hover:bg-pink-600"
              >
                설정
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-600"
              >
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 수정 폼 */}
            <div className="w-full flex flex-col gap-2 text-sm">
              <label className="flex flex-col gap-1">
                <span className="text-gray-300">이름 (필수)</span>
                <input
                  className="w-full rounded-md bg-[#2f3344] px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-300">
                  Bio (선택)
                </span>
                <textarea
                  className="w-full rounded-md bg-[#2f3344] px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="자기소개를 입력하세요 (비워두셔도 됩니다)"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-300">
                  프로필 이미지 URL (선택)
                </span>
                <input
                  className="w-full rounded-md bg-[#2f3344] px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https:// 로 시작하는 이미지 URL"
                />
              </label>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                disabled={isUpdating || !name.trim()}
                className="bg-pink-500 px-4 py-2 rounded-md text-sm font-semibold hover:bg-pink-600 disabled:opacity-50"
              >
                {isUpdating ? "저장 중..." : "저장"}
              </button>
              <button
                onClick={() => {
                  // 취소 시 다시 서버 데이터 기준으로 롤백
                  setName(user.name ?? "");
                  setBio(user.bio ?? "");
                  setAvatar(user.avatar ?? "");
                  setIsEditMode(false);
                }}
                className="bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-600"
              >
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;
