"use client";
import { useEffect } from "react";

const FortifyEnrollmentComponent = () => {
  useEffect(() => {
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
      ) as HTMLElement & { debug?: boolean; filters?: Record<string, any> };
      fortifyEnrollment.debug = true;
      fortifyEnrollment.filters = {};

      // Agregar eventos
      fortifyEnrollment.addEventListener("creationCancel", () => {
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

      // Insertar el componente en el DOM
      const parent = document.querySelector("section");
      if (parent) {
        parent.insertBefore(fortifyEnrollment, parent.firstChild);
      }
    };
    document.body.appendChild(script);

    // Agregar estilos globales
    document.body.style.height = "100vh";
    document.body.style.background = "#6D7D87";
  }, []);

  return (
    <section
      style={{
        maxWidth: "660px",
        width: "calc(100% - 20px)",
        margin: "20px auto",
      }}
    ></section>
  );
};

export default FortifyEnrollmentComponent;
