import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import getCurrentUser from "@/actions/getCurrentUser";

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

    const response = await prisma.user.createMany({
      data: data,
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
