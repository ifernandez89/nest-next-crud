"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function signPdfOnServer(pdfFile: File, certificateFile: File) {
  const formData = new FormData();
  formData.append("pdf", pdfFile);
  formData.append("certificate", certificateFile);

  const response = await fetch(`${BACKEND_URL}/sign-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error al firmar el PDF en el servidor: ${response.statusText}`);
  }

  const data = await response.json();
  return Buffer.from(data.signedPdf, "base64");
}

const FortifyCertificatesComponent = () => {
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<File | null>(null);

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
      const fortifyCertificates = document.createElement(
        "peculiar-fortify-certificates"
      );
      (fortifyCertificates as any).debug = true;
      (fortifyCertificates as any).filters = {};

      // Estilos en línea para el componente
      fortifyCertificates.style.maxWidth = "660px";
      fortifyCertificates.style.width = "calc(100% - 20px)";
      fortifyCertificates.style.margin = "20px auto";

      // Agregar eventos
      fortifyCertificates.addEventListener("selectionCancel", () => {
        router.push(`/`);
      });

      fortifyCertificates.addEventListener("selectionSuccess", async (event: any) => {
        alert("selectionSuccess");
        
        const certificateFile = new File([event.detail.certificate], "certificate.p12");
        setSelectedCertificate(certificateFile);

        console.log("pdf seleccionado", pdfFile);
        console.log("certificado seleccionado", certificateFile);


        if (pdfFile && certificateFile) {
          try {
            // Verificar que el PDF y el certificado estén bien seteados
            if (!pdfFile || !certificateFile) {
              throw new Error("El archivo PDF o el certificado no están correctamente configurados.");
            }

            // Subir el PDF y el certificado al servidor para firmar
            const signedPdf = await signPdfOnServer(pdfFile, certificateFile);
            console.log("PDF firmado:", signedPdf);

            // Descargar el PDF firmado
            downloadFile(signedPdf.buffer, "signed_document.pdf");
          } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error durante el proceso de firma.");
          }
        }
      });

      const container = document.getElementById("fortify-container");
      if (container && !container.querySelector("peculiar-fortify-certificates")) {
        container.appendChild(fortifyCertificates);
      }
    };
    document.body.appendChild(script);

    // Agregar el evento al input de archivo
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const continueButton = document.getElementById("continueButton") as HTMLButtonElement;

    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        setPdfFile(file);
        //alert("PDF cargado correctamente.");
        console.log("PDF cargado correctamente.", file);
      });
    }

    /*if (continueButton) {
      continueButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado
        console.log("Botón continuar presionado.");
        if (!pdfFile) {
          alert("Selecciona un archivo PDF primero.");
          return;
        }

        if (!selectedCertificate) {
          alert("Selecciona un certificado primero.");
          return;
        }

        try {
          // Verificar que el PDF y el certificado estén bien seteados
          if (!pdfFile || !selectedCertificate) {
            throw new Error("El archivo PDF o el certificado no están correctamente configurados.");
          }

          // Subir el PDF y el certificado al servidor para firmar
          const signedPdf = await signPdfOnServer(pdfFile, selectedCertificate);
          console.log("PDF firmado:", signedPdf);

          // Descargar el PDF firmado
          downloadFile(signedPdf.buffer, "signed_document.pdf");
        } catch (error) {
          console.error("Error:", error);
          alert("Ocurrió un error durante el proceso de firma.");
        }
      });
    }*/

    // Limpiar los elementos añadidos al desmontar el componente
    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(styleLink);
      document.body.removeChild(script);
      const fortifyCertificates = document.querySelector(
        "peculiar-fortify-certificates"
      );
      if (fortifyCertificates) {
        document
          .getElementById("fortify-container")
          ?.removeChild(fortifyCertificates);
      }
    };
  }, [router, pdfFile, selectedCertificate]);

  function downloadFile(data: ArrayBuffer, filename: string) {
    const blob = new Blob([data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  return (
    <div
      id="fortify-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* El componente se renderiza dinámicamente */}

      
      
      <Link
        className={`${buttonVariants()}`}
        href={"/fortify/create"}
        style={{
          position: "absolute",
          top: "50px",
          right: "20px",
        }}
      >
        Crear Certificado
      </Link>

      <input style={{
          position: "absolute",
          bottom: "100px",
        }} type="file" id="fileInput" accept="application/pdf" />
    </div>
  );
};

export default FortifyCertificatesComponent;