import { useCertificate } from "@/hooks/useCertificate";
import { utapi } from "@/lib/uploadthing";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const certificateGenerator = async (name: string) => {
  try {
    const url = "/pdf/certificate.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.CourierBoldOblique);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    firstPage.drawText(name, {
      x: width / 2 - 50,
      y: height / 2,
      size: 50,
      font: font,
      color: rgb(0.95, 0.1, 0.1),
    });

    const pdfBytes = await pdfDoc.save();

    const certificate = [
      new File([pdfBytes], `${name}.pdf`, {
        type: "application/pdf",
      }),
    ];

    return certificate;
  } catch (error) {
    console.log(error);
  }
};
