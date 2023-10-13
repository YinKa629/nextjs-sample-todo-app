"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import styled from "styled-components";

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
  const { data } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };
  console.log(data);
  if (!data) {
    router.push("/auth");
    return null;
  }

  return (
    <UserInfoContainer>
      {data && (
        <UserInfo>
          <header>こんにちは, {data.user?.name}さん</header>
          <button onClick={handleSignOut}>サインアウト</button>
        </UserInfo>
      )}
    </UserInfoContainer>
  );
};
