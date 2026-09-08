import NextAuthOptions from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = NextAuthOptions({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        // Login API goes here

        return null;
      },
    }),
  ],
});
