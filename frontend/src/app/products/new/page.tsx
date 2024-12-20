import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsForm } from "./products-form";
import { getProduct } from "../products.api";

/*interface Props {
  params: { id: string };
}*/
interface Props {
  params: Promise<{ id: string }>;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}
  
async function ProductsNewPage({ params }: Props) {
  //const product = await getProduct(params.id); //lado servidor, hace la consulta y se la envia a productForm: lado cliente
  let product: Product|any = [];

  const obtenerProductos = async () => {
    const resolvedParams = await params; // Espera la promesa de params
    if (resolvedParams.id) {
      let list = await getProduct(resolvedParams.id);
      product = list;
    }
  };

  await obtenerProductos();

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            {(await params).id ? "Edit Product" : "New Product"}
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
