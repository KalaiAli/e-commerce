"use client";

import { addToCart } from "@/api/actions/cardActions/addTocart";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

type AddBtnProps = {
  cls: string;
  child: ReactNode;
  prodId: string;
};

export default function AddBtn({ cls, child, prodId }: AddBtnProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,

    onSuccess: (data) => {
      toast.add({
        type: data.success ? "success" : "error",
        description: data.success
          ? "Product added successfully to your cart"
          : data.message,
      });

      queryClient.invalidateQueries({queryKey: ["GetCart"]});
    },
  });

  function handleAddToCart() {
    mutate(prodId);
  }

  return (
<button
  type="button"
  className={cls}
  onClick={() => mutate(prodId)}
  disabled={isPending}
>
{isPending ? (
  <span className="relative h-5 w-5 animate-spin">
    <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white" />
    <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white" />
    <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white" />
    <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white" />
  </span>
) : (
  child
)}
</button>
  );
}
