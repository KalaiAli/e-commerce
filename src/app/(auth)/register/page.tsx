"use client";

import React, { useState } from "react";
import { Button } from "@base-ui/react/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import registerImage from "@/assets/register.png";
import { schema } from "@/Schema/registerSchema";

type RegisterFormData = z.infer<typeof schema>;

const countries = [
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Morocco", code: "+212", flag: "🇲🇦" },
  { name: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "Tunisia", code: "+216", flag: "🇹🇳" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "China", code: "+86", flag: "🇨🇳" },
];

export default function Register() {
  const [apiError, setApiError] = useState("");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      countryCode: "",
      phone: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setApiError("");

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: `${data.countryCode}${data.phone}`,
      };

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setApiError(result.message || "Registration failed");
        return;
      }

      console.log("Registration successful:", result);

      form.reset();

      // router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setApiError("Something went wrong. Please try again.");
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
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <Controller
                      name="name"
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                          <input
                            {...field}
                            id={field.name}
                            type="password"
                            placeholder="Enter your password"
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

                    {/* Confirm Password */}
                    <Controller
                      name="rePassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Confirm Password
                          </FieldLabel>

                          <input
                            {...field}
                            id={field.name}
                            type="password"
                            placeholder="Confirm your password"
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

                    {/* Country */}
                    <Controller
                      name="countryCode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Country</FieldLabel>

                          <select
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          >
                            <option value="">Select your country</option>

                            {countries.map((country) => (
                              <option
                                key={`${country.name}-${country.code}`}
                                value={country.code}
                              >
                                {country.flag} {country.name} ({country.code})
                              </option>
                            ))}
                          </select>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Phone - Last Input */}
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Phone Number
                          </FieldLabel>

                          <div className="flex gap-2">
                            <div className="flex min-w-16 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm font-medium text-gray-700">
                              {form.watch("countryCode") || "+"}
                            </div>

                            <input
                              {...field}
                              id={field.name}
                              type="tel"
                              placeholder="1012345678"
                              autoComplete="tel"
                              aria-invalid={fieldState.invalid}
                              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* API Error */}
                    {apiError && (
                      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {apiError}
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {form.formState.isSubmitting
                        ? "Creating account..."
                        : "Sign Up"}
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
