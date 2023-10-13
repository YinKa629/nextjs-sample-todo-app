import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        userId: { label: "ユーザID", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "001",
          name: "山田 花子",
          email: "yamadaaa001@example.com",
          password: "password",
          address: "東京都千代田区",
          backendToken: "backEndAccessToken",
        };
        if (
          credentials?.userId == user.id &&
          credentials.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },

  callbacks: {
    async session({ session }) {
      console.log(session);
      return session;
    },
  },
};
