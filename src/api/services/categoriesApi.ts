import { CategoryType } from "../types/categoryType";

export async function getShopCategories(): Promise<CategoryType[]> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const payload = await response.json();

  return payload.data;
}
