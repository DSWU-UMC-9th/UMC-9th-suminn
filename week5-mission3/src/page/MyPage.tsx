import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";
import myImage from "../img.png";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };
        getData();
    },[]);

    const handleLogout = async() => {
        await logout();
        navigate("/login");
    };

    return <div className="flex flex-col items-center justify-center h-full gap-4">
                <h1>{data?.data.name}님 환영합니다.</h1>
                <div className="flex flex-col items-center justify-center">
                <img
                    src={myImage}
                    alt="프로필 이미지"
                    className="w-30 h-30 rounded-full mb-4 object-cover"
                />
                    <h2>{data?.data.name}</h2>
                    <h2>{data?.data.email}</h2>

                    <button className="cursor-pointer bg-black text-white rounded-sm p-2 font-semibold transition hover:scale-90" onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
};

export default MyPage;