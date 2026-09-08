"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { schemaSignIn } from "./../../../Schema/loginShema";
import { userLogin } from "@/api/actions/auth.actions";
import loginImgae from "@/assets/login.png";

// ====================
// Type
// ====================

export type loginData = z.infer<typeof schemaSignIn>;

// ====================
// Component
// ====================

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<loginData>({
    resolver: zodResolver(schemaSignIn),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ====================
  // Submit
  // ====================

  async function onSubmit(data: loginData) {
    // console.log(data);

    // TODO:
    // Replace this with your login API request.
    const isLogin = await userLogin(data);
    // console.log(isLogin);

    if (isLogin) {
      toast.add({
        type: "success",
        description: "Login successful.",
      });

      router.push("/");
    } else {
      toast.add({
        type: "error",
        description: "Invalid email or password.",
      });
    }
  }

  //  local  storage  5- 10 mb  forever  till not deleted   via client
  //  session Storage 5 - 10Mb   til the  tab  open         via client
  //  cookies          4 Kb      till expiry period          via client and  via serever
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex min-h-screen justify-center">
        <div className="m-0 flex max-w-7xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-lg">
          {/* ==================== */}
          {/* Form Section */}
          {/* ==================== */}

          <div className="w-full p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl font-extrabold xl:text-3xl">Sign In</h1>

              <div className="mt-8 w-full flex-1">
                {/* ==================== */}
                {/* Social Buttons */}
                {/* ==================== */}

                <div className="flex flex-col items-center">
                  {/* Google */}
                  <button
                    type="button"
                    className="flex w-full max-w-xs items-center justify-center rounded-lg bg-indigo-100 py-3 font-bold text-gray-800 shadow-sm transition hover:shadow"
                  >
                    <div className="rounded-full bg-white p-2">
                      <svg
                        className="w-4"
                        viewBox="0 0 533.5 544.3"
                        aria-hidden="true"
                      >
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />

                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />

                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />

                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>

                    <span className="ml-4">Sign In with Google</span>
                  </button>

                  {/* GitHub */}
                  <button
                    type="button"
                    className="mt-5 flex w-full max-w-xs items-center justify-center rounded-lg bg-indigo-100 py-3 font-bold text-gray-800 shadow-sm transition hover:shadow"
                  >
                    <div className="rounded-full bg-white p-1">
                      <svg
                        className="w-6"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>

                    <span className="ml-4">Sign In with GitHub</span>
                  </button>
                </div>

                {/* ==================== */}
                {/* Divider */}
                {/* ==================== */}

                <div className="my-12 border-b text-center">
                  <div className="inline-block translate-y-1/2 bg-white px-2 text-sm font-medium tracking-wide text-gray-600">
                    Or sign in with e-mail
                  </div>
                </div>

                {/* ==================== */}
                {/* Login Form */}
                {/* ==================== */}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto max-w-xs"
                >
                  {/* Email */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="mb-4">
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
                      <Field data-invalid={fieldState.invalid} className="mb-4">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                        <input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="Enter your password"
                          autoComplete="current-password"
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 flex w-full items-center justify-center rounded-lg bg-indigo-500 py-4 font-semibold tracking-wide text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ==================== */}
          {/* Right Image */}
          {/* ==================== */}

          <div className="hidden flex-1 bg-indigo-100 lg:flex">
            <div
              className="m-12 w-full bg-contain bg-center bg-no-repeat xl:m-16"
              style={{
                backgroundImage: `url(${loginImgae.src})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
