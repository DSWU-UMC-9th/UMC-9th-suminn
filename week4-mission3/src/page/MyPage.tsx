import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";
import myImage from "../img.png";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };
        getData();
    },[]);
    return <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="flex flex-col items-center justify-center">
                <img
                    src={myImage}
                    alt="프로필 이미지"
                    className="w-30 h-30 rounded-full mb-4 object-cover"
                />
                    {data?.data.name}
                </div>
            </div>
};

export default MyPage;