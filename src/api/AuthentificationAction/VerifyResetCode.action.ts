"use server";

export async function VerifyResetCode(resetCode: string) {
  const response = await fetch(
    `${process.env.API}auth/verifyResetCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetCode,
      }),
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Invalid reset code",
    };
  }

  return {
    success: true,
    data: payload,
  };
}