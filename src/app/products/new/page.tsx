import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsForm } from "./products-form";
import { getProduct } from "../products.api";
import { NextPageContext } from "next";

/*interface PageProps {
  params: {
    id: string;
  };
}*/
/*interface PageProps {
  params: Promise<{ id: string }>;
}*/

interface MyPageProps extends NextPageContext {
  params: {
    id: string; // Assuming 'id' is a string 
  };
}

async function ProductsNewPage({ params }: MyPageProps) {
  // Aquí puedes usar directamente `params.id` sin necesidad de esperar a una promesa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: any = [];

  const obtenerProductos = async () => {
    const resolvedParams = await params;
    if (resolvedParams.id) {
      const list = await getProduct(resolvedParams.id);
      product = list;
    }
  };

  await obtenerProductos();

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            {product.id ? "Edit Product" : "New Product"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProductsForm product={product}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
