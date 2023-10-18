import prisma from "@/lib/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.idNumber) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        idNumber: session.user.idNumber as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export const getRole = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.idNumber) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser.role;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
