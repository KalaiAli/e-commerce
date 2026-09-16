import { getShopCategories } from "@/api/services/categoriesApi";

import Footer from "./Footer";

export default async function FooterWrapper() {
  const categories = await getShopCategories();

  const electronics = categories.find(
    (category) => category.name === "Electronics",
  );

  const mensFashion = categories.find(
    (category) => category.name === "Men's Fashion",
  );

  const womensFashion = categories.find(
    (category) => category.name === "Women's Fashion",
  );

  return (
    <Footer
      categoryIds={{
        electronics: electronics?._id,
        mensFashion: mensFashion?._id,
        womensFashion: womensFashion?._id,
      }}
    />
  );
}
