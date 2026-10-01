import { productType } from "./productType";

export type WishListItem = productType;

export type WishListResponse = {
  status: string;
  count: number;
  data: WishListItem[];
};

export type WishListResult =
  | {
      success: true;
      data: WishListItem[];
    }
  | {
      success: false;
      message: string;
    };