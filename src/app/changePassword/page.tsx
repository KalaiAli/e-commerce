"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { toast } from "@/components/ui/toast";
import { changePasswordUser } from "@/api/AuthentificationAction/changePassword.action";
import { useRouter } from "next/navigation";
export default function ChangePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== rePassword) {
      toast.add({
        title: "Passwords do not match",
      });
      return;
    }

    setLoading(true);

    const result = await changePasswordUser({
      currentPassword,
      password,
      rePassword,
    });

    setLoading(false);

    if (!result.success) {
      toast.add({
        title: result.message,
      });
      return;
    }

    toast.add({
      title: "Password changed successfully",
    });

    setCurrentPassword("");
    setPassword("");
    setRePassword("");
   await signOut({
  callbackUrl: "/login",
});
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-blue-950">
        <h1 className="mb-6 text-2xl font-semibold">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
            required
          />

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </section>
  );
}