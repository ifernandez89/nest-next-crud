import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "./products/products.api";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

//<> Fragment // {products.map((product) => (bla bla bla))}
//en sm:grid-cols-2/ en md:grid-cols-3/ en xl:grid-cols-4 
async function HomePage() {
  const products = await getProducts();
  console.log(products);

  return (
    <>
      <div className="flex justify-between mt-5 mb-10">
        <h1 className="text-4xl font-bold">Welcome to NextNestApp!</h1>
        <Link className={buttonVariants()} href={"/products/new"}>
          Create Product
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        
        {products.map((product:Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
