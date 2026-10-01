"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { VerifyResetCode } from "@/api/AuthentificationAction/VerifyResetCode.action";

const verifyCodeSchema = z.object({
  resetCode: z.string().min(1, "Please enter the verification code"),
});

type VerifyCodeData = z.infer<typeof verifyCodeSchema>;

export default function VerifyCode() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyCodeData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(data: VerifyCodeData) {
    const response = await VerifyResetCode(data.resetCode);

    console.log("Verify response:", response);

    if (!response.success) {
      toast.add({
        type: "error",
        description: response.message || "Invalid verification code.",
      });
      return;
    }

    toast.add({
      type: "success",
      description: "Code verified successfully.",
    });

    router.push(`/resetPassword?email=${encodeURIComponent(email || "")}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Verify Code
        </h1>

        <p className="mb-8 text-center text-sm text-gray-500">
          Enter the verification code sent to
          <br />
          <span className="font-medium text-gray-700">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="resetCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mb-5">
                <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
                <input
                  {...field}
                  id={field.name}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter your code"
                  autoComplete="one-time-code"
                  aria-invalid={fieldState.invalid}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-lg tracking-[0.3em] outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
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
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/forgotPassword"
            className="text-sm font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
          >
            Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}
