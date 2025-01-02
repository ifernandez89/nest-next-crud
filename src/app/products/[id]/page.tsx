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
import { NextPageContext } from "next";

/*interface Props {
  params: {
    id: string;
  };
}
interface PageProps {
  params: Promise<{ id: string }>;
}*/

interface MyPageProps extends NextPageContext {
  params: {
    id: string; // Assuming 'id' is a string 
  };
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

async function ProductDetailPage({ params }: MyPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: any = [];
  const resolvedParams = await params;
    if (resolvedParams.id) {
      const list = await getProduct(resolvedParams.id);
      product = list;
      console.log(product);
    }

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
