"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

type UpdateProfileData = {
  name: string;
  email: string;

};

export async function updateProfileUser(data: UpdateProfileData) {
  console.log("========== UPDATE PROFILE ==========");

  const token = await getTokenFunc();

  console.log("1. TOKEN EXISTS:", !!token);
  console.log("2. TOKEN:", token);

  if (!token) {
    console.log("❌ NO TOKEN");

    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const url = `${process.env.API}users/updateMe/`;

  console.log("3. URL:", url);
  console.log("4. DATA:", data);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      name: data.name,
        email: string
    }),
  });

  console.log("5. STATUS:", response.status);
  console.log("6. OK:", response.ok);

  const result = await response.json();

  console.log("7. API RESPONSE:", result);

  if (!response.ok) {
    console.log("❌ UPDATE FAILED:", result.message);

    return {
      success: false,
      message: result.message || "Failed to update profile",
    };
  }

  console.log("✅ UPDATE SUCCESS");

  return {
    success: true,
    message: result.message || "Profile updated successfully",
    data: result,
  };
}