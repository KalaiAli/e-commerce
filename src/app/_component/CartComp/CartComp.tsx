"use client";

import { deleteCartItem } from "@/api/actions/deleteCartItem";
import { updateCartItem } from "@/api/actions/updateCartItem";
import { CartResponseType } from "@/api/types/cartType";
import Loading from "@/app/loading";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartComp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Get Cart
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery<CartResponseType>({
    queryKey: ["GetCart"],

    queryFn: async () => {
      const response = await fetch("/api/cart", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return response.json();
    },
  });

  // Update Cart Item
  const { mutate: updateCart, isPending: isUpdating } = useMutation({
    mutationFn: updateCartItem,

    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Product Updated Successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },

    onError: (error) => {
      toast.add({
        type: "error",
        description: error.message || "Update failed",
      });
    },
  });

  // Handle Quantity Update
  function handleUpdateCart(prodId: string, count: number) {
    if (!Number.isFinite(count) || count < 1) {
      return;
    }

    updateCart({
      prodId,
      count,
    });
  }

  // Delete Cart Item
  const { mutate: delCartItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteCartItem,

    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Product Deleted Successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["GetCart"],
      });
    },

    onError: (error) => {
      toast.add({
        type: "error",
        description: error.message || "Delete failed",
      });
    },
  });

  // Loading
  if (isLoading) {
    return <Loading />;
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-red-500">Failed to load cart.</p>
      </div>
    );
  }

  // Empty Cart
  if (!cartData?.numOfCartItems) {
    return (
      <section className="flex min-h-[600px] items-center justify-center bg-white px-6 py-16 dark:bg-[#0A2025]">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex h-56 w-56 items-center justify-center rounded-full bg-green-50">
            <Image
              src="/empty-cart.png"
              alt="Empty shopping cart"
              width={220}
              height={220}
              className="h-auto w-full object-contain"
            />
          </div>

          <p className="text-base leading-6 text-[#666666] dark:text-gray-300">
            Looks like you haven't added anything to your cart yet. Start
            shopping and find something you love!
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-7 cursor-pointer rounded-full bg-[#00b206] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#009b05]"
          >
            Start Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white px-8 py-9 dark:bg-[#0A2025]">
      {/* Page Title */}
      <h1 className="text-center text-[32px] font-semibold leading-9.5 text-[#191919] dark:text-white">
        My Shopping Cart
      </h1>

      <div className="mt-8 flex items-start gap-6">
        {/* Cart Products */}
        <div className="flex-1 rounded-xl border border-[#e6e6e6] bg-white p-5 shadow-sm">
          <table className="w-full table-fixed">
            {/* Header */}
            <thead>
              <tr className="border-b border-gray-300 text-center text-sm font-medium uppercase tracking-wide text-[#7f7f7f]">
                <th className="w-[40%] px-2 py-3 text-left">Product</th>

                <th className="w-[15%] px-2 py-3">Price</th>

                <th className="w-[20%] px-2 py-3">Quantity</th>

                <th className="w-[15%] px-2 py-3">Subtotal</th>

                <th className="w-[10%] px-2 py-3" />
              </tr>
            </thead>

            {/* Products */}
            <tbody>
              {cartData.data.products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 text-center"
                >
                  {/* Product */}
                  <td className="px-2 py-4 text-left">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.product.imageCover}
                        alt={product.product.title}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain"
                      />

                      <span className="text-sm text-[#191919]">
                        {product.product.title}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-2 py-4 text-sm text-[#191919]">
                    {product.price} EGP
                  </td>

                  {/* Quantity */}
                  <td className="px-2 py-4">
                    <div className="mx-auto flex w-fit items-center rounded-full border border-[#a0a0a0] bg-white px-2 py-1">
                      {/* Decrease */}
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateCart(
                            product.product._id,
                            product.count - 1,
                          )
                        }
                        disabled={isUpdating || product.count <= 1}
                        className="cursor-pointer rounded-full p-2 transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <path
                            d="M2.33398 7.5H11.6673"
                            stroke="#666666"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* Quantity */}
                      <span className="w-8 text-center text-base text-[#191919]">
                        {product.count}
                      </span>

                      {/* Increase */}
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateCart(
                            product.product._id,
                            product.count + 1,
                          )
                        }
                        disabled={isUpdating}
                        className="cursor-pointer rounded-full p-2 transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <svg
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <path
                            d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  {/* Subtotal */}
                  <td className="px-2 py-4 text-base font-bold text-red-400 underline">
                    {product.price * product.count} EGP
                  </td>

                  {/* Delete */}
                  <td className="px-2 py-4">
                    <button
                      type="button"
                      onClick={() => delCartItem(product.product._id)}
                      disabled={isDeleting}
                      className="cursor-pointer rounded-full transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Delete ${product.product.title}`}
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
                          stroke="#CCCCCC"
                          strokeMiterlimit="10"
                        />

                        <path
                          d="M16 8.5L8 16.5"
                          stroke="#666666"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M16 16.5L8 8.5"
                          stroke="#666666"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Cart Actions */}
            <tfoot>
              <tr>
                <td colSpan={3} className="px-2 pt-5">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="cursor-pointer rounded-full bg-[#f2f2f2] px-8 py-3.5 text-sm font-semibold text-[#4c4c4c] transition hover:bg-[#e6e6e6]"
                  >
                    Return to shop
                  </button>
                </td>

                <td colSpan={2} className="px-2 pt-5 text-right">
                  <button
                    type="button"
                    className="cursor-pointer rounded-full bg-[#f2f2f2] px-8 py-3.5 text-sm font-semibold text-[#4c4c4c] transition hover:bg-[#e6e6e6]"
                  >
                    Update Cart
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Cart Total */}
        <div className="w-[424px] shrink-0 rounded-xl border border-[#e6e6e6] bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-medium leading-7.5 text-[#191919]">
            Cart Total
          </h2>

          {/* Total */}
          <div className="flex items-center justify-between border-b border-[#e5e5e5] py-3">
            <span className="text-base text-[#4c4c4c]">Total:</span>

            <span className="font-semibold text-[#191919]">
              {cartData.data.totalCartPrice} EGP
            </span>
          </div>

          {/* Number of Items */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-[#4c4c4c]">
              Number Of Cart Items:
            </span>

            <span className="text-sm font-medium text-[#191919]">
              {cartData.numOfCartItems}
            </span>
          </div>

          {/* Checkout */}
          <button
            type="button"
            className="mt-5 w-full cursor-pointer rounded-full bg-[#00b206] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#009b05]"
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      {/* Coupon */}
      <div className="mt-6 flex w-full max-w-200 items-center gap-6 rounded-xl border border-[#e6e6e6] bg-white p-5 shadow-sm">
        <h3 className="w-1/4 shrink-0 text-xl font-medium leading-7.5 text-[#191919]">
          Coupon Code
        </h3>

        <div className="flex w-full items-center overflow-hidden rounded-full border border-[#e6e6e6]">
          <input
            type="text"
            placeholder="Enter code"
            className="w-full bg-transparent px-6 py-3.5 text-base text-[#999999] outline-none"
          />

          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-full bg-[#333333] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#222222]"
          >
            Apply Coupon
          </button>
        </div>
      </div>
    </section>
  );
}
