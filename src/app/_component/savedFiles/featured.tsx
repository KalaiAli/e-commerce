import Image from "next/image";
import { prodType } from "../../interfaces/product";
import Link from "next/link";

async function getData(): Promise<prodType[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.data;
}

export default async function Featured() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-slate-900">
      <div className="mx-auto container">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our Products
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Discover our latest products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.map((product, index) => (
            <article
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              <Link href={`/productDetails/${product._id}`}>
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-slate-700">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                    New
                  </span>
                </div>
              </Link>

              <div className="flex min-h-62.5 flex-col p-5">
                <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {product.category?.name}
                </p>
                <h2 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  {product.title}
                </h2>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {product.ratingsAverage}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({product.ratingsQuantity})
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.price}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      EGP
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
