import Link from "next/link";
import { getSubCategories } from "@/api/services/subCategoriesApi";

type SubCategoriesProps = {
  categoryId: string;
};

export default async function SubCategories({
  categoryId,
}: SubCategoriesProps) {
  const subCategories = await getSubCategories(categoryId);

  if (!subCategories.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          No Subcategories Found
        </h2>

        <p className="mt-2 text-gray-500">
          There are no subcategories available for this category.
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Subcategories
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory._id}
            href={`/products?subcategory=${subCategory._id}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-green-50"
          >
            <h3 className="font-semibold text-gray-800 transition-colors group-hover:text-green-600">
              {subCategory.name}
            </h3>

            <span className="mt-2 block text-sm font-medium text-green-600">
              Browse Products →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}