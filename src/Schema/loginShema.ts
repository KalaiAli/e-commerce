import { z } from "zod";
// ====================
// Validation Schema
// ====================

export const schemaSignIn = z
  .object({
    email: z
      .string()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

  })
// ====