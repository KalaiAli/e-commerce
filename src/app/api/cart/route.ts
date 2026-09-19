import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const response = await fetch(`${process.env.APICart}cart`, {
      method: "GET",
      headers: {
        token: String(token.token),
      },
      cache: "no-store",
    });

    const data = await response.json();

    // console.log("GET CART STATUS:", response.status);
    // console.log("GET CART DATA:", data);

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while fetching cart",
      },
      { status: 500 },
    );
  }
}