"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { deleteProduct } from "@/app/products/products.api";
import { useRouter } from "next/navigation";
import Image from "next/image";

/*interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}*/

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCard({ product }: any) {
  //le envio el producto a mi componente
  const router = useRouter();

  async function handleRemoveProduct(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminarlo?")) {
      console.log("Eliminado");
      await deleteProduct(id);
      router.refresh();
    } else {
      console.log("Cancelado");
    }
  }

  return (
    <>
      <Card
        onClick={() => {
          router.push(`/products/${product.id}`);
        }}
      >
        <CardHeader>
          <CardTitle className="flex justify-between">
            {product.name}
            <span className="text-sm font-bold text-gray-500">
            ${formatPrice(product.price)}
            </span>
          </CardTitle>
        </CardHeader>
        <Image alt="imagen" src={product.image} width={500} height={300}/>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between ">
          <Button
            className="mt-5"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${product.id}/edit`);
            }}
          >
            Editar
          </Button>
          <Button
            className="mt-5"
            variant="destructive"
            onClick={(e) => {
                e.stopPropagation();
                handleRemoveProduct(product.id)}}
          >
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;
