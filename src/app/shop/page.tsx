import { GetWishList } from "@/api/actions/WishListActions/getWishList";
import { getAllProducts } from "@/api/services/productApi";
import ProductCard from "../_component/ProductCard/ProductCard";
import ShopHeader from "./../_component/shopHeader";
import Breadcrumb from "../_component/BreadCrunmb";

export default async function Shop() {
  const products = await getAllProducts();
  const wishlist = await GetWishList();

  return (
    <>
      <Breadcrumb />
      <ShopHeader />

      <section>
        <div className="mb-8">
          <div className="my-8 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />

            <div>
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                <span className="text-emerald-600">Showing</span>{" "}
                {products.length} Products
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, index) => {
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
    </>
  );
}
