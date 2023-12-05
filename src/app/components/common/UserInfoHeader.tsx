"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { useEffect, useLayoutEffect, useState } from "react";
import { UserInfoItem } from "app/api/userInfo/route";
import getWeatherValue from "../weather/WeatherCodes";

const UserInfoContainer = styled.div`
  background-color: #ffefd5; /* ヘッダーの背景色を設定 */
  padding: 10px 0; /* 上下の余白を追加 */
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WeatherInfo = styled.a`
  text-align: right;
  cursor: pointer; /* マウスカーソルをポインタに変更 */
`;

export const UserInfoHeader: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfoItem | undefined>();
  const [isAuthorized, setAuthorized] = useState(false);
  const [officeCode, setOfficeCode] = useState("");

  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (!session) {
      router.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      fetch(`/api/userInfo?id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
          setAuthorized(true);
        })
        .catch((error) => {
          console.error("Failed to get user information:", error);
        });
    } else {
      setAuthorized(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    const officeCode = userInfo?.officeCode;
    if (officeCode) {
      setOfficeCode(officeCode);
      fetch(
        `https://www.jma.go.jp/bosai/forecast/data/forecast/${officeCode}.json`
      )
        .then((res) => res.json())
        .then((data) => {
          const weatherCode = data[0].timeSeries[0].areas[0].weatherCodes[0];
          setWeather(getWeatherValue(weatherCode));
        })
        .catch((error) =>
          console.error("Failed to get weather information::", error)
        );
    }
  }, [userInfo?.officeCode]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  const handleWeatherInfoClick = () => {
    router.push(`/weather/details?officeCode=${officeCode}`);
  };

  return (
    isAuthorized && (
      <UserInfoContainer>
        <UserInfo>
          <header>こんにちは, {userInfo?.name}さん</header>
          <button onClick={handleSignOut}>サインアウト</button>
          {weather && (
            <WeatherInfo onClick={handleWeatherInfoClick}>
              本日の天気は、{weather}
            </WeatherInfo>
          )}
        </UserInfo>
      </UserInfoContainer>
    )
  );
};
