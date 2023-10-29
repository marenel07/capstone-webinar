import { generateComponents } from "@uploadthing/react";
import { UTApi } from "uploadthing/server";

import { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const utapi = new UTApi();
