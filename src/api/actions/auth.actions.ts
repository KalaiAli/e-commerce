"use server";

import { UserData } from "@/app/(auth)/register/page";
import { LoginData } from "@/app/(auth)/login/page";
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

    if (!response.ok) {
      throw new Error(payload?.message || "Registration failed");
    }

    return payload;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function userLogin(data: LoginData) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.message || "Login failed");
    }

    const cookieStore = await cookies();
    cookieStore.set("userToken", payload.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return payload;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
