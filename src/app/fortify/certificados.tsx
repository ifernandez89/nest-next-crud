"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import FortifyComponent from "@/app/fortify/FortifyComponent";

export function Certificados() {
  
  const handleSignDocument = () => {
    // Lógica para disparar el componente FortifyComponent
    console.log("Firmar un Documento");
    // Aquí puedes agregar cualquier lógica adicional que necesites
  };

  return (
    <div >
        <FortifyComponent />
    </div>
  );
}
