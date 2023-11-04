import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import localFont from "next/font/local";
import { aspire, telegraf } from "@/components/font/font";

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
    const url = "/pdf/WebinarCertification.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // const fontBytesName = fs.readFileSync("/font/AspireDemibold-YaaO.ttf");
    // const fontBytes = fs.readFileSync("/font/PPTelegraf-Regular.otf");
    const nameFont = await pdfDoc.embedFont(aspire);
    const font = await pdfDoc.embedFont(telegraf);

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
