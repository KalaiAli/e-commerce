import { getAllProducts } from "@/api/services/productApi";
import ProductCard from "../ProductCard/ProductCard";

export default async function FeaturedProducts() {
  const data = await getAllProducts();
  // console.log(data);
  return (
    <>
      <h2 className="text-2Xl font-bold my-2 p-3 text-green-600 border-1-4 border-1-black">
        Featured Product
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
        {data?.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </>
  );
}
