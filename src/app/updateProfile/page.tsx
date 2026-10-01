"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "@/components/ui/toast";
import { updateProfileUser } from "@/api/AuthentificationAction/updateProfile.action";

export default function UpdateProfile() {
  const router = useRouter();
const { data: session, status, update } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const result = await updateProfileUser({
      name,
      email,
    });

    setLoading(false);

    if (!result.success) {
      toast.add({
        title: result.message,
        type: "error",
      });

      return;
    }

await update({
  name,
});

    toast.add({
      title: "Profile updated successfully",
      type: "success",
    });

    router.push("/");
  }

  if (status === "loading") {
    return <div className="py-10 text-center">Loading profile...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-blue-950">
        <h1 className="mb-6 text-2xl font-semibold">My Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
            required
          />
{/* 
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
          /> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
}
