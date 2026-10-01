"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

export async function ClearCart() {
  // console.log("DELETE ACTION STARTED:", productId);

  // console.log("DELETE ID:", productId);

  const token = await getTokenFunc();

  // console.log("TOKEN EXISTS:", !!token);

  if (!token) {
    throw new Error("You must be logged in");
  }


//   APICart=https://ecommerce.routemisr.com/api/v2/

  const response = await fetch(`${process.env.APICart}cart`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  });

  const payload = await response.json();

  // console.log("DELETE RESPONSE STATUS:", response.status);
  //  console.log("DELETE RESPONSE:", payload);

  if (!response.ok) {
    throw new Error(
      payload?.message || "Failed to clear cart",
    );
  }

  return payload;
}