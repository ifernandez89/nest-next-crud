"use client";
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

const FortifyCertificatesComponent = () => {

    useEffect(() => {
     // Verificar si la página ya se ha recargado
    const hasReloaded = sessionStorage.getItem('hasReloaded');

    if (!hasReloaded) {
      // Establecer el indicador en sessionStorage
      sessionStorage.setItem('hasReloaded', 'true');
      // Recargar la página
      window.location.reload();
      return; // Salir del efecto para evitar ejecutar el resto del código
    }
    
    // Estilos globales para el body
    const body = document.body;
    body.style.height = '100vh';
    //body.style.background = '#6D7D87';
    body.style.margin = '0'; // Resetear márgenes
    body.style.padding = '0'; // Resetear padding

    // Agregar el enlace de la fuente
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Agregar el CSS del componente
    const styleLink = document.createElement('link');
    styleLink.href = "https://cdn.jsdelivr.net/npm/@peculiar/fortify-webcomponents/dist/peculiar/peculiar.css";
    styleLink.rel = "stylesheet";
    document.head.appendChild(styleLink);

    // Cargar el script del componente
    const script = document.createElement('script');
    script.type = 'module';
    script.src = "https://cdn.jsdelivr.net/npm/@peculiar/fortify-webcomponents/dist/peculiar/peculiar.esm.js";
    script.onload = () => {
      // Crear el componente Fortify
      const fortifyCertificates = document.createElement('peculiar-fortify-certificates');
      (fortifyCertificates as any).debug = true;
      (fortifyCertificates as any).filters = {};

      // Estilos en línea para el componente
      fortifyCertificates.style.maxWidth = '660px';
      fortifyCertificates.style.width = 'calc(100% - 20px)';
      fortifyCertificates.style.margin = '20px auto';
      //fortifyCertificates.style.marginBottom = '150px';

      // Agregar eventos
      fortifyCertificates.addEventListener('selectionCancel', () => {
        alert('selectionCancel');
      });

      fortifyCertificates.addEventListener('selectionSuccess', (event: any) => {
        alert('selectionSuccess');
        alert('certificateId: ' + event.detail.certificateId);
        alert('providerId: ' + event.detail.providerId);
      });

      document.getElementById('fortify-container')?.appendChild(fortifyCertificates);
    };
    document.body.appendChild(script);

    // Limpiar los elementos añadidos al desmontar el componente
    return () => {

      document.head.removeChild(fontLink);
      document.head.removeChild(styleLink);
      document.body.removeChild(script);
      const fortifyCertificates = document.querySelector('peculiar-fortify-certificates');
      if (fortifyCertificates) {
        document.getElementById('fortify-container')?.removeChild(fortifyCertificates);
      }
    };
  }, []);

  return (
    <div id="fortify-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* El componente se renderiza dinámicamente */}
      <Link
      className={`${buttonVariants()}`}
      href={"./create"}
      style={{
        position: 'absolute',
        top: '50px',
        right: '20px',
      }}
    >
      Crear Certificado
    </Link>
    </div>
  );
};

export default FortifyCertificatesComponent;