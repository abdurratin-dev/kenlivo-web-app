import { Suspense } from "react";
import DetailsPage from "@/components/products/detailsPage";
export default async function ProductDetailsPage({
  params,
}: {
  params: { productsId: string };
}) {
  const { productsId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_KENLIVO_DATA_API}products/${productsId}`,
  );
  const data = await res.json();
  return (
    <Suspense fallback={<p>Loading</p>}>
      <DetailsPage productData={data} />
    </Suspense>
  );
}
