import FeaturedProducts from "./_component/featuredProducts/featuredProducts";
import Slider from "./_component/Slider/Slider";
import dynamic from "next/dynamic";

// Client Components:

import img1 from "../assets/blog-img-1.jpeg";
import img2 from "../assets/blog-img-2.jpeg";
import img3 from "../assets/banner-4.jpeg";
import Loading from "./loading";
// import ShopCategory from "./_component/ShopCategory/ShopCategory";

// Client Components:
const ShopCategory = dynamic(
  () => import("./_component/ShopCategory/ShopCategory"),
  { loading: () => <Loading/>},
);
export default function Home() {
  return (
    <>
      <Slider
        spaceBetween={0}
        slidesPerView={1}
        pageList={[img1.src, img2.src, img3.src]}
      />
      <ShopCategory />
      <FeaturedProducts />
    </>
  );
}
