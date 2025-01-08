export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function signPdfOnServer(pdfFile: File, certificateFile: File) {
  const formData = new FormData();
  formData.append("pdf", pdfFile);
  formData.append("certificate", certificateFile);
  

  const response = await fetch(`${BACKEND_URL}/api/signature/sign`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error al firmar el PDF en el servidor: ${response.statusText}`);
  }

  const data = await response.json();
  return Buffer.from(data.signedPdf, "base64");
}