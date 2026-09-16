import { getSinglePorduct } from "@/api/services/productApi";
import Image from "next/image";
import QuantitySelector from "../QuantitySelector";
import Slider from "@/app/_component/Slider/Slider";

type ProductDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({
  params,
}: ProductDetailsProps) {
  const { id } = await params;

  const data = await getSinglePorduct(id);

  const description = data.description || "";

  const color = description
    .match(/Colour Name\s+([^\n]+)/i)?.[1]
    ?.trim();

  const material = description.match(/Sole Material\t(.+)/)?.[1];

  const department = description.match(/Department\t(.+)/)?.[1];

  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/*
         <!-- Product Images -->
         */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              {/* Main Image */}
              <div className="relative w-full h-100 mb-4">
                <Image
                  src={data.imageCover}
                  alt={data.title}
                  fill
                  className="object-contain rounded-lg shadow-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {/* {data.images.map((imgSrc, index) => (
                  <div key={index} className="relative w-25 h-17.5 shrink-0">
                    <Image
                      src={imgSrc}
                      alt={`${data.title} ${index + 1}`}
                      fill
                      className="object-cover rounded-lg shadow-md cursor-pointer"
                      sizes="100px"
                    />
                  </div>
                ))} */}

                <Slider
                  spaceBetween={1}
                  slidesPerView={3}
                  pageList={data.images}
                />
              </div>
            </div>
            {/*
         <!-- Product Details -->
         */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">
                {data.title} - {data.brand.name}
              </h2>
              <p className="text-gray-600 mb-4">{data.category.name}</p>
              <div className="mb-4">
                {data.priceAfterDiscount ? (
                  <>
                    {" "}
                    <span className="text-blue-600 text-2xl font-bold">
                      {data.priceAfterDiscount} QAR
                    </span>
                    <span className=" mx-3 text-blue-400 text-xl font-bold line-through">
                      {data.price} QAR
                    </span>
                  </>
                ) : (
                  <span className="text-blue-600 text-2xl font-bold">
                    {data.price} QAR
                  </span>
                )}
              </div>
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-gray-600">
                  {data.ratingsAverage} ({data.ratingsQuantity} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">{data.description}</p>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>

                {color ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={color}
                      title={color}
                      className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-gray-300"
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                    />

                    <span className="text-sm text-gray-600">{color}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No color</p>
                )}
              </div>
              <div className="mb-6">
                {data.quantity > 0 ? (
                  <span className="ml-3 flex items-center gap-2 text-green-600 font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-6 animate-pulse text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    In Stock
                  </span>
                ) : (
                  <span className="ml-3 flex items-center gap-2 text-red-600 font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-6 animate-blink"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Out of Stock
                  </span>
                )}
              </div>

              <QuantitySelector stock={data.quantity} price={data.price} />
              <div className="flex space-x-4 mb-6">
                <button className="bg-indigo-600 flex flex-1  justify-center gap-2 items-center text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className="bg-gray-200 flex-1 flex gap-2 items-center justify-center fontBold cursor-pointer  text-gray-800 py-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Buy Now
                </button>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-red-200 bg-red-50 px-6 py-3 text-red-600 transition-colors hover:border-red-600 hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    Wishlist
                  </button>
                  <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-gray-300 bg-white px-4 py-3 text-black transition-colors hover:border-green-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                {(material || color || department) && (
                  <ul className="list-disc list-inside text-gray-700">
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
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <script>
      function changeImage(src) {
         document.getElementById("mainImage").src = src;
      }
   </script> */}
      </div>
    </>
  );
}
