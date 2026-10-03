"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/app/loading";
import { WishListResult } from "@/api/types/WishListType";

import AddBtn from "../_component/AddBtn/AddBtn";
import Breadcrumb from "../_component/BreadCrunmb";
import RemoveBtnWishList from "../_component/removeBtnWishList/removeFromWishList ";

async function getWishlist(): Promise<WishListResult> {
  const response = await fetch("/api/wishlist");

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return response.json();
}

export default function WishList() {
  const {
    data: wishlist,
    isPending,
    isError,
  } = useQuery<WishListResult>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    refetchOnMount: "always",
  });

  if (isPending) {
    return (
      <section className="container mx-auto px-4 py-10">
        <Loading />
      </section>
    );
  }

  if (isError || !wishlist) {
    return (
      <section className="container mx-auto px-4 py-10">
        <p>Failed to load wishlist.</p>
      </section>
    );
  }

  if (!wishlist.success) {
    return (
      <section className="container mx-auto px-4 py-10">
        <p>{wishlist.message}</p>
      </section>
    );
  }

  const items = wishlist.data;

  return (
    <section className="container mx-auto px-4 py-6 sm:py-10">
      <Breadcrumb />

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 sm:h-14 sm:w-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-red-500 sm:h-6 sm:w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>

        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">
            My Wishlist
          </h1>

          <p className="text-sm text-gray-500 sm:text-base">
            {items.length === 0
              ? "Your wishlist is empty."
              : `${items.length} ${
                  items.length === 1 ? "item" : "items"
                }`}
          </p>
        </div>
      </div>

      {/* Empty Wishlist */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 px-4 py-12 text-center">
          <p className="text-gray-500">
            Your wishlist is empty.
          </p>

          <Link
            href="/shop"
            className="mt-4 inline-block rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* =========================
              DESKTOP TABLE
          ========================= */}
          <div className="hidden overflow-hidden rounded-lg border md:block">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-sm">
                    Product
                  </th>

                  <th className="px-4 py-4 text-left text-sm">
                    Price
                  </th>

                  <th className="px-4 py-4 text-left text-sm">
                    Stock
                  </th>

                  <th className="px-4 py-4 text-center text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {items.map((product) => (
                  <tr key={product._id}>
                    {/* Product */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          width={80}
                          height={80}
                          className="h-20 w-20 shrink-0 object-contain"
                        />

                        <Link
                          href={`/productDetails/${product._id}`}
                          className="line-clamp-2 text-base font-medium transition hover:text-green-600"
                        >
                          {product.title}
                        </Link>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      <ProductPrice product={product} />
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-4">
                      <StockStatus quantity={product.quantity} />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <ProductActions product={product} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
              MOBILE CARDS
          ========================= */}
          <div className="space-y-4 md:hidden">
            {items.map((product) => (
              <div
                key={product._id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* Product */}
                <div className="flex gap-3">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="h-24 w-24 shrink-0 rounded-lg object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/productDetails/${product._id}`}
                      className="line-clamp-3 text-sm font-medium text-gray-800 transition hover:text-green-600"
                    >
                      {product.title}
                    </Link>

                    <div className="mt-2">
                      <ProductPrice product={product} />
                    </div>

                    <div className="mt-2">
                      <StockStatus quantity={product.quantity} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4">
                  {product.quantity > 0 && (
                    <AddBtn
                      prodId={product._id}
                      cls="flex-1 rounded-md bg-green-600 px-3 py-2.5 text-sm text-white transition hover:bg-green-700"
                      child="Add to Cart"
                    />
                  )}

                  <RemoveBtnWishList
                    prodId={product._id}
                    cls="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-red-500 hover:text-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

/* =========================
   Product Price
========================= */

function ProductPrice({
  product,
}: {
  product: WishListResult["data"][number];
}) {
  if (product.priceAfterDiscount) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-green-600">
          {product.priceAfterDiscount} EGP
        </span>

        <span className="text-xs text-gray-400 line-through">
          {product.price} EGP
        </span>
      </div>
    );
  }

  return (
    <span className="font-semibold text-gray-800">
      {product.price} EGP
    </span>
  );
}

/* =========================
   Stock Status
========================= */

function StockStatus({ quantity }: { quantity: number }) {
  return quantity > 0 ? (
    <span className="text-sm font-medium text-green-600">
      In Stock
    </span>
  ) : (
    <span className="text-sm font-medium text-red-500">
      Out of Stock
    </span>
  );
}

/* =========================
   Product Actions
========================= */

function ProductActions({
  product,
}: {
  product: WishListResult["data"][number];
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      {product.quantity > 0 && (
        <AddBtn
          prodId={product._id}
          cls="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
          child="Add to Cart"
        />
      )}

      <RemoveBtnWishList
        prodId={product._id}
        cls="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-gray-500 transition hover:border-red-500 hover:text-red-500"
      />
    </div>
  );
}