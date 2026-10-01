"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

export async function removeFromWishList(productId: string) {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(
    `${process.env.API}wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Failed to remove from wishlist",
    };
  }

  return {
    success: true,
    message: payload?.message || "Product removed from your WishList",
  };
}