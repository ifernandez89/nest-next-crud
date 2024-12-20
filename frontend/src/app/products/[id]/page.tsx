import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProduct } from "../products.api";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id);
  console.log(product);

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
        <img src={product.image}  />
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
