import Image from "next/image";
import { getShopCategories } from "@/api/services/categoriesApi";

export default async function ShopCategory() {
  const categories = await getShopCategories();

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop by Category</h1>

        <p className="mt-2 text-gray-500">
          Explore our wide range of products by category.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative mb-4 h-32 w-full overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Category Name */}
            <h2 className="text-center text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-600">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
