"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";
import { jwtDecode } from "jwt-decode";

type TokenData = {
  id: string;
};

export async function GetAllOrders() {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const decoded = jwtDecode<TokenData>(token);
  const userId = decoded.id;

  const response = await fetch(`${process.env.API}orders/user/${userId}`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const payload = await response.json();

  console.log("ORDERS:", JSON.stringify(payload, null, 2));

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Failed to get orders",
    };
  }

  return {
    success: true,
    data: payload,
  };
}
