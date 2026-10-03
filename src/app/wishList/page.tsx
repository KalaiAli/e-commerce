import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/app/loading";
import { WishListItem, WishListResult } from "@/api/types/WishListType";

import AddBtn from "../_component/AddBtn/AddBtn";
import Breadcrumb from "../_component/BreadCrunmb";
import RemoveBtnWishList from "../_component/removeBtnWishList/removeFromWishList ";

/* =========================================================
   API
========================================================= */

async function getWishlist(): Promise<WishListResult> {
  const response = await fetch("/api/wishlist", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return response.json();
}

/* =========================================================
   Page
========================================================= */

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
        <p className="text-red-500">Failed to load wishlist.</p>
      </section>
    );
  }

  if (!wishlist.success) {
    return (
      <section className="container mx-auto px-4 py-10">
        <p className="text-gray-600">{wishlist.message}</p>
      </section>
    );
  }

  const items = wishlist.data;

  return (
    <section className="container mx-auto px-4 py-6 sm:py-10">
      <Breadcrumb />

      <WishlistHeader count={items.length} />

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <DesktopWishlist items={items} />
          <MobileWishlist items={items} />
        </>
      )}
    </section>
  );
}

/* =========================================================
   Wishlist Header
========================================================= */

function WishlistHeader({ count }: { count: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 sm:h-14 sm:w-14">
        <HeartIcon />
      </div>

      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">My Wishlist</h1>

        <p className="text-sm text-gray-500 sm:text-base">
          {count === 0
            ? "Your wishlist is empty."
            : `${count} ${count === 1 ? "item" : "items"}`}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   Heart Icon
========================================================= */

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-red-500 sm:h-6 sm:w-6"
      aria-hidden="true"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

/* =========================================================
   Empty Wishlist
========================================================= */

function EmptyWishlist() {
  return (
    <div className="rounded-xl border border-gray-200 px-4 py-12 text-center">
      <p className="text-gray-500">Your wishlist is empty.</p>

      <Link
        href="/shop"
        className="mt-4 inline-block rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

/* =========================================================
   Desktop Wishlist
========================================================= */

function DesktopWishlist({ items }: { items: WishListItem[] }) {
  return (
    <div className="hidden overflow-hidden rounded-lg border md:block">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <TableHeader title="Product" />
            <TableHeader title="Price" />
            <TableHeader title="Stock" />
            <TableHeader title="Actions" align="center" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {items.map((product) => (
            <WishlistRow key={product._id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   Table Header
========================================================= */

function TableHeader({
  title,
  align = "left",
}: {
  title: string;
  align?: "left" | "center";
}) {
  return (
    <th
      className={`px-4 py-4 text-sm ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {title}
    </th>
  );
}

/* =========================================================
   Wishlist Row
========================================================= */

function WishlistRow({ product }: { product: WishListItem }) {
  return (
    <tr>
      {/* Product */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <ProductImage product={product} size="desktop" />

          <ProductLink product={product} />
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
  );
}

/* =========================================================
   Mobile Wishlist
========================================================= */

function MobileWishlist({ items }: { items: WishListItem[] }) {
  return (
    <div className="space-y-4 md:hidden">
      {items.map((product) => (
        <MobileWishlistCard key={product._id} product={product} />
      ))}
    </div>
  );
}

/* =========================================================
   Mobile Wishlist Card
========================================================= */

function MobileWishlistCard({ product }: { product: WishListItem }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <ProductImage product={product} size="mobile" />

        <div className="min-w-0 flex-1">
          <ProductLink product={product} />

          <div className="mt-2">
            <ProductPrice product={product} />
          </div>

          <div className="mt-2">
            <StockStatus quantity={product.quantity} />
          </div>
        </div>
      </div>

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
  );
}

/* =========================================================
   Product Image
========================================================= */

function ProductImage({
  product,
  size,
}: {
  product: WishListItem;
  size: "desktop" | "mobile";
}) {
  const isDesktop = size === "desktop";

  return (
    <Image
      src={product.imageCover}
      alt={product.title}
      width={isDesktop ? 80 : 100}
      height={isDesktop ? 80 : 100}
      className={
        isDesktop
          ? "h-20 w-20 shrink-0 object-contain"
          : "h-24 w-24 shrink-0 rounded-lg object-contain"
      }
    />
  );
}

/* =========================================================
   Product Link
========================================================= */

function ProductLink({ product }: { product: WishListItem }) {
  return (
    <Link
      href={`/productDetails/${product._id}`}
      className="line-clamp-3 text-sm font-medium text-gray-800 transition hover:text-green-600 md:line-clamp-2 md:text-base"
    >
      {product.title}
    </Link>
  );
}

/* =========================================================
   Product Price
========================================================= */

function ProductPrice({ product }: { product: WishListItem }) {
  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount !== null &&
    product.priceAfterDiscount < product.price;

  if (!hasDiscount) {
    return (
      <span className="font-semibold text-gray-800">{product.price} EGP</span>
    );
  }

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

/* =========================================================
   Stock Status
========================================================= */

function StockStatus({ quantity }: { quantity: number }) {
  const inStock = quantity > 0;

  return (
    <span
      className={`text-sm font-medium ${
        inStock ? "text-green-600" : "text-red-500"
      }`}
    >
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
}

/* =========================================================
   Product Actions
========================================================= */

function ProductActions({ product }: { product: WishListItem }) {
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
