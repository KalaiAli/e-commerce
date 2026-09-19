"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

export async function deleteCartItem(productId: string) {
  // console.log("DELETE ACTION STARTED:", productId);

  // console.log("DELETE ID:", productId);

  const token = await getTokenFunc();

  // console.log("TOKEN EXISTS:", !!token);

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(`${process.env.APICart}cart/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  const payload = await response.json();

  // console.log("DELETE RESPONSE STATUS:", response.status);
  //  console.log("DELETE RESPONSE:", payload);

  if (!response.ok) {
    throw new Error(
      payload?.message || "Failed to delete product from cart",
    );
  }

  return payload;
}