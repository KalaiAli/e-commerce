
import { getSingleProduct } from "@/api/services/productApi";
import AddBtn from "@/app/_component/AddBtn/AddBtn";
import AddBtnWishList from "@/app/_component/AddBtnWishList/AddBtnWishList";
import Slider from "@/app/_component/Slider/Slider";
import Image from "next/image";
import {
  CheckCircle,
  Share2,
  ShoppingCart,
  Star,
  Zap,
  XCircle,
} from "lucide-react";
import QuantitySelector from "../QuantitySelector";

type ProductDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({
  params,
}: ProductDetailsProps) {
  const { id } = await params;
  const data = await getSingleProduct(id);

  const description = data.description || "";

  const color =
    description.match(/Colour Name\s+([^\n]+)/i)?.[1]?.trim();

  const material =
    description.match(/Sole Material\t(.+)/)?.[1]?.trim();

  const department =
    description.match(/Department\t(.+)/)?.[1]?.trim();

  const hasDiscount =
    data.priceAfterDiscount &&
    data.priceAfterDiscount < data.price;

  return (
    <div className="mt-4 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="mb-8 w-full px-4 md:w-1/2">
            <div className="relative mb-4 h-100 w-full">
              <Image
                src={data.imageCover}
                alt={data.title}
                fill
                priority
                className="rounded-lg object-contain shadow-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex justify-center overflow-x-auto py-4">
              <Slider
                spaceBetween={1}
                slidesPerView={3}
                pageList={data.images}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full px-4 md:w-1/2">
            {/* Title */}
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {data.title}
            </h1>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-gray-600">
                {data.brand.name}
              </span>

              <span className="text-gray-400">•</span>

              <span className="text-gray-600">
                {data.category.name}
              </span>
            </div>

            {/* Price */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-blue-600">
                {data.priceAfterDiscount ?? data.price} EGP
              </span>

              {hasDiscount && (
                <span className="text-xl font-bold text-gray-400 line-through">
                  {data.price} EGP
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mb-5 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-5 text-yellow-500"
                  fill="currentColor"
                />
              ))}

              <span className="ml-2 text-gray-600">
                {data.ratingsAverage} ({data.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="mb-6 leading-7 text-gray-700">
              {data.description}
            </p>

            {/* Color */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold">
                Color
              </h2>

              {color ? (
                <div className="flex items-center gap-3">
                  <span
                    className="size-8 rounded-full border-2 border-white shadow ring-2 ring-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                    title={color}
                  />

                  <span className="text-sm text-gray-600">
                    {color}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No color available
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {data.quantity > 0 ? (
                <div className="flex items-center gap-2 font-semibold text-green-600">
                  <CheckCircle className="size-5" />
                  In Stock
                </div>
              ) : (
                <div className="flex items-center gap-2 font-semibold text-red-600">
                  <XCircle className="size-5" />
                  Out of Stock
                </div>
              )}
            </div>

            {/* Quantity */}
            <QuantitySelector
              stock={data.quantity}
              price={data.price}
            />

            {/* Cart / Buy */}
            <div className="mb-6 flex gap-4">
              <AddBtn
                prodId={data._id}
                cls="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-green-600 py-3 text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                child={
                  <>
                    <ShoppingCart className="size-5" />
                    Add to Cart
                  </>
                }
              />

              <button
                type="button"
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-200 py-3 font-semibold text-gray-800 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Zap className="size-5" />
                Buy Now
              </button>
            </div>

            {/* Wishlist / Share */}
            <div className="mb-6 flex gap-4">
              <AddBtnWishList
                prodId={data._id}
                initiallyAdded={false}
                cls="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-red-200 bg-white px-6 py-3 text-gray-800 transition hover:border-green-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              />

              <button
                type="button"
                className="flex cursor-pointer items-center justify-center rounded-md border-2 border-gray-300 bg-white px-5 py-3 text-gray-800 transition hover:border-green-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Share product"
                title="Share product"
              >
                <Share2 className="size-6" />
              </button>
            </div>

            {/* Key Features */}
            {(material || color || department) && (
              <div>
                <h2 className="mb-3 text-lg font-semibold">
                  Key Features
                </h2>

                <ul className="space-y-2 text-gray-700">
                  {material && (
                    <li>
                      <strong>Material:</strong> {material}
                    </li>
                  )}

                  {color && (
                    <li>
                      <strong>Color:</strong> {color}
                    </li>
                  )}

                  {department && (
                    <li>
                      <strong>Department:</strong> {department}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
