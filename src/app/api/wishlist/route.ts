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
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const response = await fetch(`${process.env.API}wishlist`, {
      method: "GET",
      headers: {
        token: String(token.token),
      },
      cache: "no-store",
    });

    const data = await response.json();
    
    // console.log("WISHLIST API DATA:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to fetch wishlist",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching wishlist",
      },
      { status: 500 },
    );
  }
}
