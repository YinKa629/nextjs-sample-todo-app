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
  const [userInfo, setUserInfo] = useState<UserInfoItem>();

  useLayoutEffect(() => {
    if (session && session.user) {
      const userName = session.user.name;
      fetch(`/api/userInfo?name=${userName}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => console.error("API call error:", error));
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  if (!session) {
    router.push("/auth");
    return null;
  }

  return (
    <UserInfoContainer>
      {userInfo && (
        <UserInfo>
          <header>こんにちは, {userInfo?.name}さん</header>
          <button onClick={handleSignOut}>サインアウト</button>
        </UserInfo>
      )}
    </UserInfoContainer>
  );
};
