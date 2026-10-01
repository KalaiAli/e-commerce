"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { ForgotPasswd } from "@/api/AuthentificationAction/Authentification.action";


const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordData) {
    const response = await ForgotPasswd(data.email);

  console.log("response:", response);

    if (!response.success) {
      toast.add({
        type: "error",
        description: response.message || "Failed to send reset code.",
      });
      return;
    }

    toast.add({
      type: "success",
      description: "Reset code sent to your email.",
    });
     router.push(`/verifyCode?email=${encodeURIComponent(data.email)}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Forgot Password?
        </h1>

        <p className="mb-8 text-center text-sm text-gray-500">
          Enter your email and we will send you a verification code.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mb-5">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Example@email.com"
                  autoComplete="email"
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
            {isSubmitting ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
