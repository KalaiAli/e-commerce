"use server";
import { getTokenFunc } from "@/Utilities/getTokenData";
import { WishListResponse, WishListResult } from "@/api/types/WishListType";

export async function GetWishList(): Promise<WishListResult> {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(`${process.env.API}wishlist`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Failed to get wishlist",
    };
  }

  const payload: WishListResponse = await response.json();
  
  // console.log("WISHLIST:", JSON.stringify(payload, null, 2));

  return {
    success: true,
    data: payload.data,
  };
}
