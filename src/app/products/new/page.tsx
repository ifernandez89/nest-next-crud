import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsForm } from "./products-form";
//import { getProduct } from "../products.api";

/*interface Props {
  params: { id: string };
}*/
/*interface PageProps {
  params: {
    id: string;
  };
}*/


async function ProductsNewPage(/*{ params }: PageProps*/) {
  // Aquí puedes usar directamente `params.id` sin necesidad de esperar a una promesa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /*let product: any = [];

  const obtenerProductos = async () => {
    if (params.id) {
      const list = await getProduct(params.id);
      product = list;
    }
  };

  await obtenerProductos();*/

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
           Edit Product
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProductsForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
