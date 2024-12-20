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

export function ProductCard({ product }: any) {
  //le envio el producto a mi componente
  const router = useRouter();

  async function handleRemoveProduct(id) {
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
              ${product.price}
            </span>
          </CardTitle>
        </CardHeader>
        <img src={product.image} />
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
