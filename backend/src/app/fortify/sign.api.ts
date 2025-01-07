import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { SignPdf, plainAddPlaceholder } from "node-signpdf";
import { PDFDocument } from "pdf-lib";

const app = express();
const port = 4000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const upload = multer({ dest: "uploads/" });

interface SignPdfRequest extends Request {
  files?: {
    pdf: multer.File[];
    certificate: multer.File[];
  };
}

const signPdf = async (pdfBuffer: Buffer, p12Buffer: Buffer): Promise<Buffer> => {
  // Crear un marcador de posición para la firma
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pdfWithPlaceholder = await plainAddPlaceholder({
    pdfBuffer,
    reason: "Firma digital",
    signatureLength: 8192,
  });

  // Firmar el PDF
  const signer = new SignPdf();
  const signedPdf = signer.sign(pdfWithPlaceholder, p12Buffer);

  return signedPdf;
};

app.post("/sign-pdf", upload.fields([{ name: "pdf" }, { name: "certificate" }]), async (req: SignPdfRequest, res: Response) => {
  const pdfFile = req.files?.pdf[0];
  const certificateFile = req.files?.certificate[0];

  try {
    if (!pdfFile || !certificateFile) {
      throw new Error("PDF file or certificate file is missing");
    }

    const pdfBuffer = fs.readFileSync(pdfFile.path);
    const p12Buffer = fs.readFileSync(certificateFile.path);

    const signedPdf = await signPdf(pdfBuffer, p12Buffer);
    res.json({ signedPdf: signedPdf.toString("base64") });

    // Eliminar archivos temporales
    fs.unlinkSync(pdfFile.path);
    fs.unlinkSync(certificateFile.path);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});