import { NextResponse } from "next/server";

export type UserInfoItem = {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  backendToken: string;
};

const UserInfo: UserInfoItem[] = [
  {
    id: "001",
    name: "山田 花子",
    email: "yamadaaa001@example.com",
    password: "password",
    address: "東京都千代田区",
    backendToken: "backEndAccessToken",
  },
];

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get("name");

  if (!userName) {
    return NextResponse.error("User ID is required");
  }

  const user = UserInfo.find((item) => item.name === userName);

  if (!userName) {
    return NextResponse.error("User not found");
  }

  return NextResponse.json(user);
};
