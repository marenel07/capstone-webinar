import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: Request,
  { params }: { params: { webinarId: string } }
) {
  try {
    const body = await req.json();
    const { department } = body;

    if (!params.webinarId) {
      return new NextResponse("Webinar id is required", { status: 400 });
    }

    if (!department) {
      return new NextResponse("Department is required", { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const webinar = await prisma.webinar.update({
      where: {
        id: params.webinarId,
        authorId: user.id,
      },
      data: {
        departmentPost: department,
        isPosted: true,
      },
    });

    revalidatePath("/");

    return NextResponse.json(webinar);
  } catch (error) {
    console.log("[WWEBINAR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
