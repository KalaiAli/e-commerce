import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFunc () {
  const cookieStore = await cookies();


  const nextAuthtoken = cookieStore.get("next-auth.session-token")?.value;

  const accessToken= await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthtoken,
  });

//   console.log("reel token ---> ", accessToke?.token);
  // product ID will come from the component

  return accessToken?.token;
}