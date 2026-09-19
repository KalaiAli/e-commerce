import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

type UserData = {
  id: string;
  name: string;
  email: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "My Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const apiUrl = `${process.env.API}auth/signin`;

        // console.log("API:", process.env.API);
        // console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const payload = await response.json();

        // console.log("payload....", payload);

        if (!response.ok || !payload.token) {
          return null;
        }

        const userData = jwtDecode<UserData>(payload.token);

        // console.log("userData....", userData);

        return {
          id: userData.id,
          name: userData.name,
          email: credentials.email,
          token: payload.token,
        };
      },
    }),
  ],
  //   callback trigger when success or refresh ,or getSession
  callbacks: {
    // token  obj  data =>
    // user  obj  authorize =>

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.token = user.token;
      }
      //  console.log('token----',token)
      return token;
    },

    async session({ session, token }) {
      // console.log("session --->", session, token);

      session.user.id = token.id;
  
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
