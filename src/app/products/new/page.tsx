"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsForm } from "./products-form";
import { getProduct } from "../products.api";
import React from "react";

/*interface PageProps {
  params: {
    id: string;
  };
}*/
type PageProps = {
  params: Promise<{ id: string }>;
};
//async function ProductsNewPage({ params }: PageProps) {
const ProductsNewPage: React.FC<PageProps> = ({ params }) => {
  const [resolvedParams, setResolvedParams] = React.useState<{
    id: string;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = React.useState<any>([]);
  React.useEffect(() => {
    params
      .then((resolved) => {
        setResolvedParams(resolved);
      })
      .catch((error) => {
        console.error("Error resolving params:", error);
      })
      .finally(() => {
        console.log("Params resolution completed");
      });
  }, [params]);
  React.useEffect(() => {
    const obtenerProductos = async () => {
      if (resolvedParams?.id) {
        try {
          const list = await getProduct(resolvedParams.id);
          setProduct(list);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    obtenerProductos();
  }, [resolvedParams]);
  /*----------------------------------------------*/
  if (!resolvedParams) {
    return <div>Loading...</div>;
  }
  const { id } = resolvedParams;

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>{id ? "Edit Product" : "New Product"}</CardHeader>

        <CardContent>
          <ProductsForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsNewPage;
