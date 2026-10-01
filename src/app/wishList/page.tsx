
"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";


import { WishListResult } from "@/api/types/WishListType";
import AddBtn from "../_component/AddBtn/AddBtn";

import Breadcrumb from './../_component/BreadCrunmb';
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
      <Loading/>
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
    <section className="container mx-auto px-4 py-10">
      <Breadcrumb />
      {/*  */}
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-red-500"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">My Wishlist</h1>

          {items.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <p className="text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>
      </div>
      {/*  */}

      <>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-175]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-4 text-left">Product</th>
                <th className="px-4 py-4 text-left">Price</th>
                <th className="px-4 py-4 text-left">Stock</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {items.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-contain"
                      />

                      <Link
                        href={`/productDetails/${product._id}`}
                        className="font-medium hover:text-green-600"
                      >
                        {product.title}
                      </Link>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {product.priceAfterDiscount ? (
                      <div>
                        <span className="font-semibold text-green-600">
                          {product.priceAfterDiscount} EGP
                        </span>

                        <span className="ml-2 text-sm text-gray-400 line-through">
                          {product.price} EGP
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">{product.price} EGP</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {product.quantity > 0 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-500">Out of Stock</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {product.quantity > 0 && (
                        <AddBtn
                          prodId={product._id}
                          cls="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                          child="Add to Cart"
                        />
                      )}

                      <RemoveBtnWishList
                        prodId={product._id}
                        cls="flex h-9 w-9 items-center justify-center rounded-full border text-gray-500 hover:border-red-500 hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </section>
  );
}
