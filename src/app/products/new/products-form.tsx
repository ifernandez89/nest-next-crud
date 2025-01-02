"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createProduct,updateProduct } from "../products.api";
import { useParams, useRouter } from "next/navigation";

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
  const params = useParams<{id:string}>();

  const onSubmit = handleSubmit(async (data) => {
    const priceString = data.price.toString();
    const cleanedPrice = parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
    if(params?.id){
      await updateProduct(params.id,{
        ...data,
      //price: parseFloat(data.price),//si no se parsea, no guarda el valor
      price: cleanedPrice,
      });
    }else{
    await createProduct({
      ...data,
      //: parseFloat(data.price),
      price: cleanedPrice,
    });}
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

      <Button className="mt-5">
        {params.id ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
