import localFont from "next/font/local";

export const aspire = localFont({
  src: "./public/font/AspireDemibold-YaaO.ttf",
  display: "swap",
}) as unknown as Uint8Array;

export const telegraf = localFont({
  src: "./public/font/PPTelegraf-Regular.otf",
  display: "swap",
}) as unknown as Uint8Array;
