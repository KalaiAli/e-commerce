"use server";
//   with  useMutation  , API POST 
import { getTokenFunc } from "@/Utilities/getTokenData";

export async function addToCart(productId: string) {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(`${process.env.APICart}cart`, {
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
      message: payload?.message || "Failed to add product to cart",
    };
  }

  return {
    success: true,
    data: payload,
  };
}
