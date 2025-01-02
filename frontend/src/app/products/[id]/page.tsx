import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProduct } from "../products.api";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


interface Props {
  params: {
    id: string;
  };
}

async function ProductDetailPage({ params }: Props) {
  let product: any = undefined;
  try{
  const resolvedParams = await params;
      if (resolvedParams.id) {

        product = await getProduct(params.id);
        console.log(product);

      }} catch (err) {
    // Handle errors appropriately (e.g., log, display error message)
    console.error('Error fetching product:', err);}


  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {product.name}
            <span className="text-sm font-bold text-gray-500">
              ${product.price}
            </span>
          </CardTitle>
        </CardHeader>
        <Image alt="imagen" src={product.image} width={500} height={300} />
        <CardContent className="flex justify-between">
        <CardContent>
          Product Detail:
          <p>{product.description}</p>
          </CardContent>
          <Link href="/" className={buttonVariants()}>
              Go Back
            </Link>
        </CardContent>
        <CardFooter className="flex justify-between "></CardFooter>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
