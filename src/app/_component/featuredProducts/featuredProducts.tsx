import { getAllProducts } from "@/api/services/productApi";
import ProductCard from "../ProductCard/ProductCard";


type FeaturedProductsProps = {
  category: string;
  title: string;
};

export default async function FeaturedProducts({
  category,
  title,
}: FeaturedProductsProps) {
  const products = await getAllProducts();

  const filteredProducts = category
    ? products.filter((product) => product.category._id === category)
    : products;

  return (
    <section>
      {/* <h2 className="my-6  border-black p-3 text-2xl font-bold text-green-600">
        {title}
      </h2> */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
