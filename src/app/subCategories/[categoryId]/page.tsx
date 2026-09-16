import { getSubCategories } from "@/api/services/subCategoriesApi";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  const subCategories = await getSubCategories(categoryId);

// console.log(
//   "Subcategories:",
//   subCategories.map((subCategory) => ({
//     name: subCategory.name,
//     id: subCategory._id,
//   })),
// );


  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Subcategories</h1>

      {subCategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subCategories.map((subCategory) => (
            <Link
              key={subCategory._id}
              href={`/products?subcategory=${subCategory._id}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-green-50"
            >
              <h2 className="font-semibold text-gray-800 group-hover:text-green-600">
                {subCategory.name}
              </h2>

              <span className="mt-2 block text-sm font-medium text-green-600">
                Browse Products →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No Subcategories Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no subcategories available for this category.
          </p>
        </div>
      )}
    </main>
  );
}
