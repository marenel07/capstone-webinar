import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import getCurrentUser from "@/actions/getCurrentUser";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const path = "/admin/users";
    const user = await getCurrentUser();

    const { data } = body;

    if (user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!data) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash("!def@ult", 12);

    const users = data.map((user: User) => {
      return {
        ...user,
        password: hashedPassword,
      };
    });

    const response = await prisma.user.createMany({
      data: users,
    });

    //send email verification
    // await sendEmail({
    //   email,
    //   emailType: 'VERIFY',
    //   userId: user.id,
    // });
    revalidatePath(path);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error, "REGISTRATION_USERS_ERROR");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
