import Image from "next/image";
import Link from "next/link";
import { getShopBrands } from "@/api/services/brandsApi";

export default async function Brand() {
  const brands = await getShopBrands();

  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Brands
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
          >
            <div className="relative h-24 w-full">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="150px"
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-4 font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-600">
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

