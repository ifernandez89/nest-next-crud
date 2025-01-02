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

/*interface MyPageProps extends NextPageContext {
  params: {
    [id: string]: never;
  };
}*/
interface PageProps {
  params: { id: string };
  searchParams?: any;
  err?: (Error & { statusCode?: number }) | null;
}


interface MyPageProps extends NextPageContext {
  params: { id: string };
}


async function ProductsNewPage({ params }: MyPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: any = [];

  try {
    const obtenerProductos = async () => {
      const resolvedParams = await params;
      if (resolvedParams.id) {
        const list = await getProduct(resolvedParams.id);
        product = list;
      }
    };
    await obtenerProductos();
  } catch (err) {
    // Handle errors appropriately (e.g., log, display error message)
    console.error('Error fetching product:', err);
  }
  
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
