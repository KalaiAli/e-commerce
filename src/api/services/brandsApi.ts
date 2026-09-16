import { BrandType } from "../types/brandType";

export async function getShopBrands(): Promise<BrandType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getShopBrands failed:", error);
    throw error;
  }
}

export async function getBrandDetails(
  brandId: string,
): Promise<BrandType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch brand: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getBrandDetails failed:", error);
    throw error;
  }
}