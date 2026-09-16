"use server";

import { UserData } from "@/app/(auth)/register/page";
import { loginData } from "@/app/(auth)/login/page";
import { cookies } from "next/headers";

export async function userRegister(data: UserData) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const payload = await response.json();

    // console.log("payload:", payload);

    // return payload;
    return response.ok;
  } catch (error) {
    console.error("Registration error:", error);
  }

  //   const result = await response.json();
}

// export async function userLogin(data: loginData) {
//   try {

//    if (response.ok) {
//       const cookie= await cookies()
//       cookie.set('userToken',payload.token, {
//        httpOnly:true,
//         // maxAge:6000,     expiry  new date
//       })
//    }
//     // return payload;
//     return response.ok;
//   } catch (error) {
//     console.error("Registration error:", error);
//   }

//   //   const result = await response.json();
// }
