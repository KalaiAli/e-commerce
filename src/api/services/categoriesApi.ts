import { CategoryType } from "../types/categoryType";

export async function getShopCategories(): Promise<CategoryType[]> {
  const apiUrl = process.env.API;

  if (!apiUrl) {
    throw new Error("API environment variable is not defined");
  }

  const response = await fetch(`${apiUrl}categories`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const payload = await response.json();

  return payload.data;
}
