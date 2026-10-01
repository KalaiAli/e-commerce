"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

const API = process.env.API;

type ChangePasswordData = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export async function changePasswordUser(data: ChangePasswordData) {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(`${API}users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: String(token),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to change password",
    };
  }

  return {
    success: true,
    message: result.message || "Password changed successfully",
    data: result,
  };
}