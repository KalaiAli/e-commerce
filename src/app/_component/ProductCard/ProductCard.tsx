import { productType } from "@/api/types/productType";
import Image from "next/image";
import Link from "next/link";
import AddBtn from "../AddBtn/AddBtn";
import AddBtnWishList from "../AddBtnWishList/AddBtnWishList";

type ProductCardProps = {
  product: productType;
  index: number;
  isInWishlist: boolean;
};

export default function ProductCard({
  product,
  index,
  isInWishlist,
}: ProductCardProps) {
  const discount = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : 0;

  return (
    <div className="my-2">
      <div className="w-full rounded-lg border border-blue-200 p-4 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className="relative">
          {/* Discount */}
          {product.priceAfterDiscount && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-orange-400 px-2 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <AddBtnWishList
            prodId={product._id}
            initiallyAdded={isInWishlist}
            cls="absolute right-2 top-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-600 shadow transition-colors duration-300 hover:text-red-600!"
          />

          {/* View Product */}
          <Link
            href={`/productDetails/${product._id}`}
            className="absolute right-2 top-1/4 z-10 -translate-y-1/2"
            aria-label={`View ${product.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
              />
            </svg>
          </Link>

          {/* Product Image */}
          <div className="relative h-64 w-full">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={index === 0}
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-4">
          <h3 className="line-clamp-1 text-base font-medium text-gray-800">
            {product.title}
          </h3>

          <p className="text-xs font-medium uppercase text-green-600">
            {product.category.name}
          </p>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1 text-sm">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`h-4 w-4 ${
                  star <= Math.round(product.ratingsAverage)
                    ? "text-orange-500"
                    : "text-gray-300"
                }`}
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724L9.049 2.927z" />
              </svg>
            ))}

            <span>{product.ratingsAverage}</span>
          </div>

          {/* Price & Cart */}
          <div className="mt-2 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-xl font-semibold text-blue-600">
                    {product.priceAfterDiscount} EGP
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    {product.price} EGP
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-500">
                  {product.price} EGP
                </span>
              )}
            </div>

            <AddBtn
              prodId={product._id}
              cls="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow transition hover:bg-indigo-700"
              child={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
