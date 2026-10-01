export type OrderProduct = {
  _id: string;
  title: string;
  imageCover: string;
};

export type OrderItem = {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
};

export type Order = {
  _id: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
  cartItems: OrderItem[];
};
