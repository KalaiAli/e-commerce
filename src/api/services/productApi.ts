import { productType } from "../types/productType";

// All products API

export async function getAllProducts(): Promise<productType[]> {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );

    if (!response.ok) throw new Error("Failed to fetch products");

    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.error("getAllProducts failed:", error);
    throw error; // re-throw original, don't mask it
  }
}

// product detail API
// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

export async function getSinglePorduct(productId: string): Promise<productType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );

    if (!response.ok) throw new Error("Failed to fetch products");
    
    const payload = await response.json();
    return payload.data;

  } catch (error) {
    console.error("getAllProducts failed:", error);
    throw error; // re-throw original, don't mask it
  }
}
