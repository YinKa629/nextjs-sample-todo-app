"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
import { UserInfoItem } from "app/api/userInfo/route";

const UserInfoContainer = styled.div`
  background-color: #ffd000ed; /* ヘッダーの背景色を設定 */
  padding: 10px 0; /* 上下の余白を追加 */
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserInfoHeader: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfoItem | undefined>();
  const [isAuthorized, setAuthorized] = useState<boolean | undefined>();

  useLayoutEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      fetch(`/api/userInfo?id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setAuthorized(true);
          setUserInfo(data);
        })
        .catch((error) => console.error("API call error:", error));
    } else {
      router.push("/auth");
      setAuthorized(
        false
      ); /* リダイレクト先でヘッダー情報を表示させないための制御 */
    }
  }, [router, session]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    isAuthorized && (
      <UserInfoContainer>
        <UserInfo>
          <header>こんにちは, {userInfo?.name}さん</header>
          <button onClick={handleSignOut}>サインアウト</button>
        </UserInfo>
      </UserInfoContainer>
    )
  );
};
