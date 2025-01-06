"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const FortifyEnrollmentComponent = () => {
  const router = useRouter();
  useEffect(() => {
    // Verificar si la página ya se ha recargado
    const hasReloaded = sessionStorage.getItem("hasReloaded");
   
    if (!hasReloaded) {
      // Establecer el indicador en sessionStorage
      sessionStorage.setItem("hasReloaded", "true");
      // Recargar la página
      window.location.reload();
      return; // Salir del efecto para evitar ejecutar el resto del código
    }

    // Estilos globales para el body
    const body = document.body;
    body.style.height = "100vh";

    // Agregar el enlace de la fuente
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Agregar el CSS del componente
    const styleLink = document.createElement("link");
    styleLink.href =
      "https://cdn.jsdelivr.net/npm/@peculiar/fortify-webcomponents/dist/peculiar/peculiar.css";
    styleLink.rel = "stylesheet";
    document.head.appendChild(styleLink);

    // Cargar el script del componente
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://cdn.jsdelivr.net/npm/@peculiar/fortify-webcomponents/dist/peculiar/peculiar.esm.js";
    script.onload = () => {
      // Crear el componente Fortify
      const fortifyEnrollment = document.createElement(
        "peculiar-fortify-enrollment"
      );
      (fortifyEnrollment as any).debug = true;
      (fortifyEnrollment as any).filters = {};

      // Estilos en línea para el componente
      fortifyEnrollment.style.maxWidth = "660px";
      fortifyEnrollment.style.width = "calc(100% - 20px)";
      fortifyEnrollment.style.margin = "20px auto";

      // Agregar eventos
      fortifyEnrollment.addEventListener("creationCancel", () => {
        router.push(`/fortify`);
        console.log("creationCancel");
      });

      fortifyEnrollment.addEventListener("creationClose", () => {
        console.log("creationClose");
      });

      fortifyEnrollment.addEventListener("creationSuccess", (event: any) => {
        console.log(event);
      });

      fortifyEnrollment.addEventListener("creationFail", (event: any) => {
        console.log(event);
      });

      const container = document.getElementById("fortify-container");
      if (container && !container.querySelector("peculiar-fortify-enrollment")) {
        container.appendChild(fortifyEnrollment);
      }
    };
    document.body.appendChild(script);

    // Limpiar los elementos añadidos al desmontar el componente
    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(styleLink);
      document.body.removeChild(script);
      const fortifyEnrollment = document.querySelector(
        "peculiar-fortify-certificates"
      );
      if (fortifyEnrollment) {
        document
          .getElementById("fortify-container")
          ?.removeChild(fortifyEnrollment);
      }
    };
    
  }, []);

  return (
    <section
      id="fortify-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    ></section>
  );
};

export default FortifyEnrollmentComponent;
