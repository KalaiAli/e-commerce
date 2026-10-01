"use client";

import { removeFromWishList } from "@/api/actions/WishListActions/removeFromWishList";
import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RemoveBtnWishListProps = {
  cls: string;
  prodId: string;
};

export default function RemoveBtnWishList({
  cls,
  prodId,
}: RemoveBtnWishListProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeFromWishList,

    onSuccess: (data) => {
      if (!data?.success) {
        toast.add({
          type: "error",
          description: data?.message || "Failed to remove item",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Product removed from your WishList",
      });

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error: Error) => {
      toast.add({
        type: "error",
        description: error.message || "Failed to remove item",
      });
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutate(prodId)}
      disabled={isPending}
      className={cls}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M135.2 17.7C140.5 7.4 151.1 0 163 0h122c11.9 0 22.5 7.4 27.8 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384l-21.2 339.2C393.5 494.1 374.5 512 347.5 512h-247C73.5 512 54.5 494.1 53.2 467.2L32 128z" />
      </svg>
    </button>
  );
}
