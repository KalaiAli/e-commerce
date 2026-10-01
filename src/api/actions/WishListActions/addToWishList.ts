"use server";
//   with  useMutation  , API POST 
import { getTokenFunc } from "@/Utilities/getTokenData";

export async function addToWishList(productId: string) {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(`${process.env.API}wishlist`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const payload = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Failed to add product to WishList",
    };
  }

  return {
    success: true,
    message: payload?.message || "Product Added to your WishList",
    data: payload,
  };
}
