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

      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },
  });

  function handleAddToCart() {
    mutate(prodId);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
      className={cls}
    >
      {isPending ? "Adding..." : child}
    </button>
  );
}
