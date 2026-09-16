import { getShopCategories } from "@/api/services/categoriesApi";

import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getShopCategories();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Categories
      </h1>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group flex min-h-38 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
          >
            <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="96px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 className="text-center text-base font-medium text-gray-800 transition-colors duration-300 group-hover:text-green-600">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* SomeDetails */}

    </main>
  );
}

