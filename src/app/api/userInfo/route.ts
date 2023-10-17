import { NextResponse } from "next/server";

export type UserInfoItem = {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  backendToken: string;
};

const userInfoItems: UserInfoItem[] = [
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
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.error("UserId is required");
  }

  const user = userInfoItems.find((item) => item.id === userId);

  if (!user) {
    return NextResponse.error("User not found");
  }

  return NextResponse.json(user);
};
