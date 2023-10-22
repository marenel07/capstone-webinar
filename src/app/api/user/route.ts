import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();

    const { idNumber } = body;

    if (user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!idNumber) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const response = await prisma.user.delete({
      where: {
        idNumber: idNumber,
      },
    });

    revalidatePath("/admin/users");

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error, "DELETE_USER_ERROR");
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();

    const { idNumber, role } = body;

    if (user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!idNumber || !role) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const response = await prisma.user.update({
      where: {
        idNumber,
      },
      data: {
        role,
      },
    });

    revalidatePath("/admin/users");

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error, "PATCH_USER_ERROR");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
