import CheckOutForm from "../checkOutForm";


type Props = {
  params: Promise<{
    cartId: string;
  }>;
  searchParams: Promise<{
    payment?: string;
  }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { cartId } = await params;
  const { payment } = await searchParams;

  const paymentMethod = payment === "online" ? "online" : "cash";

  return (
    
    <CheckOutForm
      cartId={cartId}
      paymentMethod={paymentMethod}
    />
  );
}