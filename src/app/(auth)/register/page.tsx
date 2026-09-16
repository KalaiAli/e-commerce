"use client";

import { useState } from "react";
import { Button } from "@base-ui/react/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/toast";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import registerImage from "@/assets/register.png";
import { schema } from "@/Schema/registerSchema";
import { userRegister } from "@/api/actions/auth.actions";
import { useRouter } from "next/navigation";


export type UserData = z.infer<typeof schema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const router =useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function onSubmit(data: UserData) {
    const isRegitser = await userRegister(data);
    // console.log(isRegitser);

    if (isRegitser) {
      //  success   , naviage User
      toast.add({
        type: "success",
        description: "User Created successfully.",
      });
      router.push('/login')
    } else {
      toast.add({
        type: "error",
        description: "Fail to create the User.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex min-h-screen justify-center">
        <div className="m-0 flex max-w-7xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-lg">
          {/* Form Section */}
          <div className="w-full p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
            <div className="mt-8 flex flex-col items-center">
              <h1 className="text-2xl font-extrabold xl:text-3xl">Sign up</h1>

              <div className="mt-8 w-full flex-1">
                {/* Social Buttons */}
                <div className="mx-auto grid max-w-xs grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.55 2.53-2.95 3.32v2.77h3.52c2.06-1.9 3.07-4.7 3.07-8.1z" />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2.18c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 8.03c.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    GitHub
                  </button>
                </div>

                {/* Divider */}
                <div className="my-10 border-b text-center">
                  <div className="inline-block translate-y-1/2 bg-white px-2 text-sm font-medium tracking-wide text-gray-600">
                    Or sign up with e-mail
                  </div>
                </div>

                {/* Form */}
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                          <input
                            {...field}
                            id={field.name}
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            aria-invalid={fieldState.invalid}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Email */}
                    <Controller
                      name="email"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
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

                    {/* Password */}
                    <Controller
                      name="password"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                          <div className="relative">
                            <input
                              {...field}
                              id={field.name}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              autoComplete="new-password"
                              aria-invalid={fieldState.invalid}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Confirm Password */}
                    <Controller
                      name="rePassword"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Confirm Password
                          </FieldLabel>

                          <div className="relative">
                            <input
                              {...field}
                              id={field.name}
                              type={showRePassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              autoComplete="new-password"
                              aria-invalid={fieldState.invalid}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />

                            <button
                              type="button"
                              onClick={() => setShowRePassword((prev) => !prev)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                              aria-label={
                                showRePassword
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showRePassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Phone */}
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Phone Number
                          </FieldLabel>

                          <input
                            {...field}
                            id={field.name}
                            type="tel"
                            placeholder="01012345678"
                            autoComplete="tel"
                            aria-invalid={fieldState.invalid}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden flex-1 bg-indigo-100 lg:flex">
            <div
              className="m-12 w-full bg-contain bg-center bg-no-repeat xl:m-16"
              style={{
                backgroundImage: `url(${registerImage.src})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
