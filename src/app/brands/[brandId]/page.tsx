
import BrandsDetails from "@/app/_component/brandsDetails/brandsDetails";
type PageProps = {
  params: Promise<{
    brandId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { brandId } = await params;

  return <BrandsDetails brandId={brandId} />;
}