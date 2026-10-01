"use server";

import { ShippingData } from "@/app/checkout/checkOutForm";
import { getTokenFunc } from "@/Utilities/getTokenData";

export async function payOnline(cartId: string, dataship: ShippingData) {
  const token = await getTokenFunc();

  if (!token) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const response = await fetch(
    `${process.env.API}orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAdress: dataship,
      }),
    },
  );

  const payload = await response.json();

  console.log("API payload:", payload);

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Failed to Pay",
    };
  }

  return payload;
}
