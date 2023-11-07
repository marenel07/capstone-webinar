import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      idNumber: session.user.idNumber,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export const getAuthToken = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.SECRET });
};

export default serverAuth;
