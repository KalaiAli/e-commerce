import { SubCategoryType } from "../types/SubCategoryType";

export async function getSubCategories(
  categoryId: string,
): Promise<SubCategoryType[]> {
  const response = await fetch(
    `${process.env.API}subcategories?category=${categoryId}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch subcategories: ${response.status}`);
  }

  const payload = await response.json();

  return payload.data;
}
