import { cache } from "react";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";
import { DEPARTMENT_POST, WEBINAR_STATUS } from "@prisma/client";
import { revalidatePath } from "next/cache";

const getPostedWebinarsByStatus = cache(async (status: WEBINAR_STATUS) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    let webinars;

    if (currentUser?.role === "STAFF") {
      webinars = await prisma.webinar.findMany({
        where: {
          departmentPost: {
            not: "UNPOST",
          },
          status: status,
        },
        include: {
          participants: true,
          author: true,
        },
      });
    } else {
      webinars = await prisma.webinar.findMany({
        where: {
          departmentPost: (currentUser?.department as DEPARTMENT_POST) || "ALL",
          status: status,
        },
        include: {
          participants: true,
          author: true,
        },
      });
    }

    if (!webinars) {
      return null;
    }

    revalidatePath("/");

    return webinars;
  } catch (error) {
    console.log("WEBINARS ERROR: ", error);
    return null;
  }
});

export default getPostedWebinarsByStatus;
