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
        userName: { label: "ユーザ名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "admin",
          email: "jsmith@example.com",
          role: "admin",
          password: "xxxx",
          backendToken: "backEndAccessToken",
        };
        if (
          credentials?.userName == user.name &&
          credentials.password == user.password
        ) {
          console.log("認証成功");
          return user;
        } else {
          console.log("認証失敗");
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
