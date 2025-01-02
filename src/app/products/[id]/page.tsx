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

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

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
            ${formatPrice(product.price)}
            </span>
          </CardTitle>
        </CardHeader>
        <Image alt="imagen" src={product.image} width={500} height={300} />
        <CardContent className="flex justify-between mt-6">
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
