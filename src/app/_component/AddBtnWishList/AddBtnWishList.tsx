"use client";

import { addToWishList } from "@/api/actions/WishListActions/addToWishList";
import { removeFromWishList } from "@/api/actions/WishListActions/removeFromWishList";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AddBtnWishListProps = {
  cls: string;
  prodId: string;
  initiallyAdded: boolean;
};

export default function AddBtnWishList({
  cls,
  prodId,
  initiallyAdded,
}: AddBtnWishListProps) {
  const [added, setAdded] = useState(initiallyAdded);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      added ? removeFromWishList(prodId) : addToWishList(prodId),

    onSuccess: (data) => {
      if (!data.success) {
        toast.add({
          type: "error",
          description: data.message,
        });

        return;
      }

      setAdded((prev) => !prev);

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });

      router.refresh();

      toast.add({
        type: "success",
        description: data.message,
      });
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      className={cls}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${added ? "text-red-500" : "text-gray-700"}`}
        fill={added ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  );
}
