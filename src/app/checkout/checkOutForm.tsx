"use client";

import { payCash } from "@/api/actions/payment/paycash";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { payOnline } from "@/api/actions/payment/payonline";

export interface ShippingData {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

type PaymentMethod = "cash" | "online";

type CheckOutFormProps = {
  cartId: string;
  paymentMethod: PaymentMethod;
};

export default function CheckOutForm({
  cartId,
  paymentMethod,
}: CheckOutFormProps) {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<ShippingData>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  const { isSubmitting } = formState;

  async function submitForm(data: ShippingData) {
    try {
      let payload;

      if (paymentMethod === "cash") {
        payload = await payCash(cartId, data);
      } else {
        payload = await payOnline(cartId, data);
      }

       console.log("payload:", payload);

      if (payload.status === "success") {
        toast.add({
          type: "success",
          description:
            paymentMethod === "cash"
              ? "Order placed successfully"
              : "Redirecting to payment...",
        });

        if (paymentMethod === "online" && payload.session?.url) {
          window.location.assign(payload.session.url);
          return;
        }

        router.push("/");
        return;
      }

      toast.add({
        type: "error",
        description: payload.message || "Payment failed",
      });
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="mx-auto my-10 w-1/2 p-10">
      <h2 className="mb-6 text-2xl font-semibold">
        {paymentMethod === "cash" ? "Cash Payment" : "Online Payment"}
      </h2>

      <form onSubmit={handleSubmit(submitForm)} className="mx-auto max-w-xs">
        {/* Details */}
        <Controller
          name="details"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4">
              <FieldLabel htmlFor={field.name}>Details</FieldLabel>

              <input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your details"
                autoComplete="street-address"
                aria-invalid={fieldState.invalid}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4">
              <FieldLabel htmlFor={field.name}>Phone</FieldLabel>

              <input
                {...field}
                id={field.name}
                type="tel"
                placeholder="Enter your phone"
                autoComplete="tel"
                aria-invalid={fieldState.invalid}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* City */}
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4">
              <FieldLabel htmlFor={field.name}>City</FieldLabel>

              <input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your city"
                autoComplete="address-level2"
                aria-invalid={fieldState.invalid}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Postal Code */}
        <Controller
          name="postalCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4">
              <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>

              <input
                {...field}
                id={field.name}
                type="text"
                placeholder="Enter your postal code"
                autoComplete="postal-code"
                aria-invalid={fieldState.invalid}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-indigo-500 py-4 font-semibold tracking-wide text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Processing..."
            : paymentMethod === "cash"
              ? "Place Order"
              : "Pay Online"}
        </button>
      </form>
    </div>
  );
}
