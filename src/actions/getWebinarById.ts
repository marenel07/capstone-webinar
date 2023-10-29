import { cache } from "react";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";

const getWebinarById = cache(async (webinarId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    if (!webinarId) {
      return null;
    }

    const webinar = await prisma.webinar.findUnique({
      where: {
        id: webinarId,
      },
      include: {
        participants: true,
      },
    });

    if (!webinar) {
      return null;
    }

    return webinar;
  } catch (error) {
    console.log("WEBINAR_ID_ERROR: ", error);
    return null;
  }
});

export default getWebinarById;
