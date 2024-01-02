"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserInfoItem = {
  id: string;
  name: string;
  email: string;
  password: string;
  officeCode: string;
  address: string;
  backendToken: string;
};

type UserInfoContextType = {
  userInfo?: UserInfoItem;
};

const UserInfoContext = createContext<UserInfoContextType>({});

const UserInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfoItem>();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      if (!session) {
        router.push("/auth");
      } else {
        if (session?.user?.id) {
          try {
            const response = await fetch(`/api/userInfo?id=${session.user.id}`);
            const userData = await response.json();
            setUserInfo(userData);
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        }
      }
    };
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.id]);

  return (
    <UserInfoContext.Provider value={{ userInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context.userInfo;
};

export { UserInfoContext, UserInfoProvider };
