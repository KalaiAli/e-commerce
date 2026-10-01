"use client";

import { useSearchParams } from "next/navigation";
import { Mail, MapPin, UserRound, Phone } from "lucide-react";


export default function AddressPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";

  return (
<section className="container mx-auto px-4 py-10">
  <h1 className="mb-6 text-2xl font-semibold">My Address</h1>

  <div className="max-w-md rounded-xl border bg-white p-6 shadow-sm">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <UserRound className="h-5 w-5 text-green-600" />

        <div>
          <p className="text-xs text-gray-400">Name</p>
          <p className="font-medium text-gray-800">{name}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-green-600" />

        <div>
          <p className="text-xs text-gray-400">Email</p>
          <p className="font-medium text-gray-800">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Phone className="h-5 w-5 text-green-600" />

        <div>
          <p className="text-xs text-gray-400">Mobile Number</p>
          <p className="font-medium text-gray-800">+974 5555 5555</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-green-600" />

        <div>
          <p className="text-xs text-gray-400">Address</p>
          <p className="font-medium text-gray-800">Doha, Qatar</p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}