"use server";

export async function ForgotPasswd(email: string) {
  const response = await fetch(`${process.env.API}auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Failed to send reset code",
    };
  }

  return {
    success: true,
    data: payload,
  };

}
