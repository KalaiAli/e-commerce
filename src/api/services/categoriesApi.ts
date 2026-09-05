import { CategoryType } from "../types/categoryType";

export async function getShopCategories(): Promise<CategoryType[]> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 8000));

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getShopCategories failed:", error);
    throw error;
  }
}
