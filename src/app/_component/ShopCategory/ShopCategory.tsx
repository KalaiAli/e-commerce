import Image from "next/image";
import Link from "next/link";
import { getShopCategories } from "@/api/services/categoriesApi";
import SomeDetails from "../someDetails/someDetails";

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default async function ShopCategory() {
  const categories = await getShopCategories();

  return (
    <section className="py-12">
      <div className="mb-8">
        <SomeDetails/>
        <div className="flex  items-center gap-3 my-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Shop By <span className="text-emerald-600">Category</span>
          </h2>
        </div>
      </div>

      <div className="mb-6">
        <Link
          href="/"
          className="inline-block rounded-lg bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
        >
          All Products
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/?category=${category._id}&categoryName=${encodeURIComponent(
              category.name,
            )}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
          >
            <div className="relative mb-4 h-32 w-full overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h2 className="text-center text-sm font-semibold text-gray-800 group-hover:text-green-600">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
