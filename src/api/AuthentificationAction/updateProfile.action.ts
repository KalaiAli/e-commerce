"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

type UpdateProfileData = {
  name: string;
  email?: string;
};

export async function updateProfileUser(data: UpdateProfileData) {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(`${process.env.API}users/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message:
        result.errors?.msg || result.message || "Failed to update profile",
    };
  }

  return {
    success: true,
    message: "Profile updated successfully",
    data: result,
  };
}
