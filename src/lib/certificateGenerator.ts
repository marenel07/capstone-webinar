import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

interface CertificateGenerator {
  userName: string | undefined;
  title: string;
  date: string;
  speaker: string;
}

export const certificateGenerator = async ({
  userName,
  title,
  date,
  speaker,
}: CertificateGenerator) => {
  try {
    const url = "/images/certification.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const fontBytesName = await fetch("/font/aspire.ttf").then((res) =>
      res.arrayBuffer()
    );
    const fontBytes = await fetch("/font/telegraf.otf").then((res) =>
      res.arrayBuffer()
    );
    const nameFont = await pdfDoc.embedFont(fontBytesName);
    const font = await pdfDoc.embedFont(fontBytes);

    const nameWidth = nameFont.widthOfTextAtSize(userName as string, 50);
    const titleWidth = font.widthOfTextAtSize(title, 16);
    const speakerWidth = font.widthOfTextAtSize(speaker, 16);

    const { width, height } = firstPage.getSize();

    const xName = (width - nameWidth) / 2;
    const xTitle = (width - titleWidth) / 2;
    const xSpeaker = (width - speakerWidth) / 2;

    firstPage.drawText(userName as string, {
      x: xName,
      y: height / 2 - 30,
      size: 50,
      font: nameFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(title, {
      x: xTitle,
      y: height / 2 - 120,
      size: 16,
      font: font,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(speaker, {
      x: xSpeaker,
      y: height - 550,
      size: 16,
      font: font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const certificate = [
      new File([pdfBytes], `${userName}.pdf`, {
        type: "application/pdf",
      }),
    ];

    return certificate;
  } catch (error) {
    console.log(error);
  }
};
