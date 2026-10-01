"use server";

import { jwtDecode } from "jwt-decode";
import { getTokenFunc } from "@/Utilities/getTokenData";
import { Order } from "@/api/types/orderType";

type TokenData = {
  id: string;
};

type OrdersResult =
  | {
      success: true;
      data: Order[];
    }
  | {
      success: false;
      message: string;
    };

export async function GetAllOrders(): Promise<OrdersResult> {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const { id } = jwtDecode<TokenData>(token);

  const response = await fetch(`${process.env.API}orders/user/${id}`, {
    headers: {
      token,
    },
    cache: "no-store",
  });

  const payload = await response.json();

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
