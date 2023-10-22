import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();

    const { idNumber, firstName, lastName, name, course, year, department } =
      body;

    if (user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        idNumber: idNumber,
      },
    });

    if (existingUser) {
      return new NextResponse("ID number is already existed", { status: 409 });
    }

    if (
      !idNumber ||
      !firstName ||
      !lastName ||
      !name ||
      !course ||
      !year ||
      !department
    ) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const response = await prisma.user.create({
      data: {
        idNumber,
        firstName,
        lastName,
        name,
        course,
        year,
        department,
      },
    });

    revalidatePath("/admin/users");

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error, "REGISTRATION_USER_ERROR");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
