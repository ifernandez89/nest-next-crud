"use client";
import { useEffect } from 'react';

const FortifyComponent = () => {
  useEffect(() => {
    // Estilos globales para el body
    const body = document.body;
    body.style.height = '100vh';
    body.style.background = '#6D7D87';
    body.style.margin = '0'; // Resetear márgenes
    body.style.padding = '0'; // Resetear padding
    //body.style.marginBottom = '150px'; // Agregar margen inferior

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
      fortifyCertificates.debug = true;
      fortifyCertificates.filters = {};

      // Estilos en línea para el componente
      fortifyCertificates.style.maxWidth = '660px';
      fortifyCertificates.style.width = 'calc(100% - 20px)';
      fortifyCertificates.style.margin = '20px auto';
      fortifyCertificates.style.marginBottom = '150px';

      // Agregar eventos
      fortifyCertificates.addEventListener('selectionCancel', () => {
        alert('selectionCancel');
      });

      fortifyCertificates.addEventListener('selectionSuccess', (event: any) => {
        alert('selectionSuccess');
        alert('certificateId: ' + event.detail.certificateId);
        alert('providerId: ' + event.detail.providerId);
      });

      document.body.appendChild(fortifyCertificates);
    };
    document.body.appendChild(script);
  }, []);

  return null; // El componente se renderiza dinámicamente
};

export default FortifyComponent;