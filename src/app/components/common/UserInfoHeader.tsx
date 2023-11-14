"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
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
  const [isAuthorized, setAuthorized] = useState<boolean | undefined>();
  const [weatherData, setWeatherData] = useState({
    timeDefines: [],
    weatherCodes: [],
  });

  const [officeCode, setOfficeCode] = useState("");

  const [weather, setWeather] = useState("");

  useLayoutEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      fetch(`/api/userInfo?id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setAuthorized(true);
          setUserInfo(data);

          // Fetch Weather API Call
          setOfficeCode(userInfo?.officeCode as string);
          if (officeCode) {
            fetch(
              `https://www.jma.go.jp/bosai/forecast/data/forecast/${officeCode}.json`
            )
              .then((res) => res.json())
              .then((weatherData) => {
                setWeatherData({
                  timeDefines: weatherData[0].timeSeries[0].timeDefines,
                  weatherCodes:
                    weatherData[0].timeSeries[0].areas[0].weatherCodes,
                });
                getWeather();
              })
              .catch((error) =>
                console.error("Weather API call error:", error)
              );
          }
        })
        .catch((error) => console.error("API call error:", error));
    } else {
      router.push("/auth");
      setAuthorized(
        false
      ); /* リダイレクト先でヘッダー情報を表示させないための制御 */
    }
  }, [router, session, weather]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  const getWeather = async () => {
    setWeather(getWeatherValue(`${weatherData.weatherCodes[0]}`));
  };

  return (
    isAuthorized && (
      <UserInfoContainer>
        <UserInfo>
          <header>こんにちは, {userInfo?.name}さん</header>
          <button onClick={handleSignOut}>サインアウト</button>
          <WeatherInfo href={`/weather/details?officeCode=${officeCode}`}>
            本日の天気は、{weather}
          </WeatherInfo>
        </UserInfo>
      </UserInfoContainer>
    )
  );
};
