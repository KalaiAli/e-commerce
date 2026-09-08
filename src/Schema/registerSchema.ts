import { z } from "zod";
export const schema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(20, "Name must be at most 20 characters")
      .regex(
        /^[A-Z][a-zA-Z ]*$/,
        "Name must start with a capital letter and contain only letters and spaces",
      ),

    email: z.string().email("Please enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    rePassword: z.string().min(1, "Please confirm your password"),

    phone: z
      .string()
      .regex(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian mobile number",
      ),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
