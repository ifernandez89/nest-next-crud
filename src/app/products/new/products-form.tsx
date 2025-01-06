"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../products.api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import FortifyComponent from "@/app/fortify/chooseCertificate";

/*interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductsForm({ product }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: product?.image,
    },
  }); //aca puedo cargarle valores por defecto

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const handleSignDocument = () => {
    // Lógica para disparar el componente FortifyComponent
    console.log('Firmar un Documento');
    // Aquí puedes agregar cualquier lógica adicional que necesites
  };

  const onSubmit = handleSubmit(async (data) => {
    const priceString = data.price.toString();
    const cleanedPrice = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    if (params?.id) {
      await updateProduct(params.id, {
        ...data,
        //price: parseFloat(data.price),//si no se parsea, no guarda el valor
        price: cleanedPrice,
      });
    } else {
      await createProduct({
        ...data,
        //: parseFloat(data.price),
        price: cleanedPrice,
      });
    }
    router.push("/");
    router.refresh();
  });
  return (
    <form onSubmit={onSubmit}>
      <Label>Product Name</Label>
      <Input {...register("name")} />
      <Label>Description</Label>
      <Input {...register("description")} />
      <Label>Price</Label>
      <Input {...register("price")} />
      <Label>Image</Label>
      <Input {...register("image")} />
      <CardContent className="flex justify-between mt-5">
        <CardContent>
          <Button>{params.id ? "Update Product" : "Create Product"}</Button>
        </CardContent>
        <Link href="/" className={buttonVariants()}>
          Go Back
        </Link>
      </CardContent>
      
    </form>
  );
}
