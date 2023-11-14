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
        try {
          const url = `http://localhost:3000/api/userInfo?id=${credentials?.userId}`;
          const response = await fetch(url);
          const user = await response.json();
          if (response.ok && user.password === credentials?.password) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
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

    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
