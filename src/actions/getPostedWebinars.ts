import { cache } from "react";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";

const getPostedWebinars = cache(async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const webinars = await prisma.webinar.findMany({
      where: {
        departmentPost: "ALL",
        status: "UPCOMING",
      },
      include: {
        participants: true,
        author: true,
      },
    });

    if (!webinars) {
      return null;
    }

    return webinars;
  } catch (error) {
    console.log("WEBINARS ERROR: ", error);
    return null;
  }
});

export default getPostedWebinars;
