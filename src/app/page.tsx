import Image from "next/image";
import { getShopCategories } from "@/api/services/categoriesApi";

import FeaturedProducts from "./_component/featuredProducts/featuredProducts";
import ShopCategory from "./_component/ShopCategory/ShopCategory";

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const selectedCategory = params.category ?? "";

  const categories = await getShopCategories();

  const selectedCategoryData = categories.find(
    (category) => category._id === selectedCategory,
  );

  const selectedCategoryName =
    selectedCategoryData?.name ?? "Featured Products";

  return (
    <>
      <ShopCategory />

      <div className="my-6">
        {selectedCategoryData && (
          <div className="mb-6 flex items-center gap-3">
            <div className="group relative flex h-16 w-16 items-center justify-center rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-md">
              <Image
                src={selectedCategoryData.image}
                alt={selectedCategoryData.name}
                fill
                sizes="64px"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h2 className="text-2xl font-bold text-blue-800 underline">
              {selectedCategoryData.name}
            </h2>
          </div>
        )}

        <FeaturedProducts
          category={selectedCategory}
          title={selectedCategoryName}
        />
      </div>
    </>
  );
}
