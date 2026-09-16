import Image from "next/image";
import Link from "next/link";
import { getShopCategories } from "@/api/services/categoriesApi";
import SomeDetails from "@/app/_component/someDetails/someDetails";

export default async function Categories() {
  const categories = await getShopCategories();

  return (
    <section className="py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/subCategories/${category._id}`}
            className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
          >
            <div className="relative mx-auto mb-3 h-48 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              {category.name}
            </h3>

            <span className="invisible mt-2 block text-xs font-medium text-green-600 group-hover:visible">
              View Subcategories →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <SomeDetails />
      </div>
    </section>
  );
}
