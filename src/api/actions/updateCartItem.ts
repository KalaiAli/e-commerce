"use server";

import { getTokenFunc } from "@/Utilities/getTokenData";

type UpdateCartItemProps = {
  prodId: string;
  count: number;
};

export async function updateCartItem({
  prodId,
  count,
}: UpdateCartItemProps) {
  const token = await getTokenFunc();

  if (!token) {
    throw new Error("You must be logged in");
  }

  if (!prodId) {
    throw new Error("Product ID is required");
  }

  if (!Number.isFinite(count) || count < 1) {
    throw new Error("Invalid quantity");
  }

  const response = await fetch(
    `${process.env.APICart}cart/${prodId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        count: Number(count),
      }),
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(
      payload?.message || "Failed to update product in cart",
    );
  }

  return payload;
}