import Image from "next/image";
import { getBrandDetails } from "@/api/services/brandsApi";

type BrandsDetailsProps = {
  brandId: string;
};

export default async function BrandsDetails({
  brandId,
}: BrandsDetailsProps) {
  const brand = await getBrandDetails(brandId);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col items-center gap-6 p-8 sm:flex-row">
          {/* Brand Image */}
          <div className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-md">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              sizes="128px"
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Brand Information */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {brand.name}
            </h1>

            <p className="mt-2 text-gray-500">
              Discover products from {brand.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}