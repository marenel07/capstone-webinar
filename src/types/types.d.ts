import { WEBINAR_STATUS } from "@prisma/client";

export type Webinar = {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  time: string;
  authorId: string;
  speaker: string;
  description: string;
  status: WEBINAR_STATUS;
  isPosted: boolean;
};
