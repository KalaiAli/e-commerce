import { getAllProducts } from "@/api/services/productApi";
import ProductCard from "../_component/ProductCard/ProductCard";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category, subcategory } = await searchParams;

  const products = await getAllProducts();


//  console.log("Selected subcategory:", subcategory);

//  console.log(
//    "Products matching subcategory:",
//    products.filter((product) =>
//      product.subcategory?.some((item) => item._id === subcategory),
//    ),
//  );

  const filteredProducts = products.filter((product) => {
    if (subcategory) {
      return product.subcategory?.some((item) => item._id === subcategory);
    }

    if (category) {
      return product.category?._id === category;
    }

    return true;
  });

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <p className="mt-2 text-gray-500">
          {filteredProducts.length} products found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-60 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-lg text-gray-500">No products found.</p>
        </div>
      )}
    </main>
  );
}
