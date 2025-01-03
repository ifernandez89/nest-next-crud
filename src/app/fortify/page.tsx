"use client";

import FortifyComponent from "./FortifyComponent";

function SignDocument() {
  /*const handleSignDocument = () => {
    // Lógica para disparar el componente FortifyComponent
    console.log("Firmar un Documento");
    // Aquí puedes agregar cualquier lógica adicional que necesites
  };
  <Button onClick={handleSignDocument}>Firmar un Documento</Button> */
  return (
    <div className="h-screen flex justify-center items-center">
      <FortifyComponent />
    </div>
  );
}

export default SignDocument;
