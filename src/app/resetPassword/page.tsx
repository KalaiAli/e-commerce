"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { ResetPassword } from "@/api/AuthentificationAction/ResetPassword.action";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordData) {
    if (!email) {
      toast.add({
        type: "error",
        description: "Email is missing.",
      });
      return;
    }

    const response = await ResetPassword({
      email,
      newPassword: data.newPassword,
    });

    if (!response.success) {
      toast.add({
        type: "error",
        description: response.message || "Failed to reset password.",
      });
      return;
    }

    toast.add({
      type: "success",
      description: "Password reset successfully.",
    });

    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Reset Password
        </h1>

        <p className="mb-8 text-center text-sm text-gray-500">
          Create a new password for
          <br />
          <span className="font-medium text-gray-700">
            {email}
          </span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="mb-5"
              >
                <FieldLabel htmlFor={field.name}>
                  New Password
                </FieldLabel>

                <input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="mb-5"
              >
                <FieldLabel htmlFor={field.name}>
                  Confirm Password
                </FieldLabel>

                <input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-500 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}