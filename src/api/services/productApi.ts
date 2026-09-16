import { productType } from "../types/productType";

// All products API
export async function getAllProducts(): Promise<productType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getAllProducts failed:", error);
    throw error;
  }
}

// Product detail API
export async function getSinglePorduct(
  productId: string,
): Promise<productType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getSingleProduct failed:", error);
    throw error;
  }
}
