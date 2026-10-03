import { GetWishList } from "@/api/actions/WishListActions/getWishList";
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
  const wishlist = await GetWishList();

  const filteredProducts = category
    ? products.filter((product) => product.category._id === category)
    : products;

  return (
    <section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      
        {filteredProducts.map((product, index) => {
          const isInWishlist =
            wishlist.success &&
            wishlist.data?.some((item) => item._id === product._id) === true;

          return (
          
            <ProductCard
              key={product._id}
              product={product}
              index={index}
              isInWishlist={isInWishlist}
            />
          );
        })}
      </div>
    </section>
  );
}
