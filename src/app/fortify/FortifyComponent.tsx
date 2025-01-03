import { useEffect } from 'react';

const FortifyComponent = () => {
  useEffect(() => {
    const fortifyCertificates = document.getElementById('fortify-certificates-wc');
    if (fortifyCertificates) {
      fortifyCertificates.filters = { /* tus filtros aquí */ };
      fortifyCertificates.addEventListener('selectionSuccess', (result) => {
        console.log(result);
      });
    }
  }, []);

  return (
    <peculiar-fortify-certificates id="fortify-certificates-wc" language="en" />
  );
};

export default FortifyComponent;