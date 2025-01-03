//"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsForm } from "./products-form";
import { getProduct } from "../products.api";

interface PageProps {
  params: {
    id: string;
  };
}
/*
interface PageProps {
  params: { id: string };
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: any;
  err?: (Error & { statusCode?: number });
}
interface MyPageProps extends NextPageContext {
  params: { id: string };
}*/
/*interface PageProps {
  params: Promise<{ id: string }>;
}*/

async function ProductsNewPage({ params }: PageProps) {
//const params = useParams<{ id: string }>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: any = [];
  //try {
    //const obtenerProductos = useDebouncedCallback( async () => {
        const obtenerProductos = async () => {
        /*if (params?.id) {
          console.log('estoy recibiendo el id?');
          console.log(params.id);
          const list = await getProduct(params.id);
          console.log('estoy recibiendo el producto?');
          console.log(list);
          product = list;*/
          const resolvedParams = await params;
      if (resolvedParams.id) {
        console.log(resolvedParams.id);
        const list = await getProduct(resolvedParams.id);
        product = list;
        }
    //}, 1000);
    await obtenerProductos();
  } 
  /*catch (err) {
    // Handle errors appropriately (e.g., log, display error message)
    console.error('Error fetching product:', err);
  }*/
  
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            {product.id ? "Edit Product" : "New Product"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProductsForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
