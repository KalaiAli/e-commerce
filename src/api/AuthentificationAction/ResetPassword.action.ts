"use server";

type ResetPasswordData = {
  email: string;
  newPassword: string;
};

export async function ResetPassword(data: ResetPasswordData) {
  const response = await fetch(
    `${process.env.API}auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        newPassword: data.newPassword,
      }),
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: payload?.message || "Failed to reset password.",
    };
  }

  return {
    success: true,
    data: payload,
  };
}