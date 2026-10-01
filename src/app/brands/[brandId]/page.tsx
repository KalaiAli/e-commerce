
import BrandsDetails from "@/app/_component/brandsDetails/brandsDetails";
import Breadcrumb from "@/app/_component/BreadCrunmb";
type PageProps = {
  params: Promise<{
    brandId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { brandId } = await params;

  return 
  <> 
    
     <Breadcrumb />
    <BrandsDetails brandId={brandId} />;
  </>

}