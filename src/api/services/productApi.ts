import { productType } from "../types/productType";

// All products API
export async function getAllProducts(): Promise<productType[]> {
  try {
    const response = await fetch(`${process.env.API}products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getAllProducts failed:", error);
    throw error;
  }
}

// Product detail API
export async function getSingleProduct(
  productId: string,
): Promise<productType> {
  try {
    const response = await fetch(
      `${process.env.API}products/${productId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getSingleProduct failed:", error);
    throw error;
  }
}