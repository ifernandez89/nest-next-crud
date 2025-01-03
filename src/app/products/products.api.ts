//funciones que piden al backend
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/*interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}*/

export async function getProducts() {
  const data = await fetch(`${BACKEND_URL}/api/products`, {
    cache: "no-store",
  });
  return await data.json(); //debe esperar hasta que se resuelva la respuesta antes de retornarla
}

export async function getProduct(id: string) {
  const data = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  return await data.json(); //debe esperar hasta que se resuelva la respuesta antes de retornarla
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProduct(productData: any) {
  const res = await fetch(`${BACKEND_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  console.log(data);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct(id: string, newProduct: any) {
  const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    cache: "no-store",
  });
  return await res.json(); //debe esperar que se resuelva antes de retornarla
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  return await res.json(); //debe esperar que se resuelva antes de retornarla
}
