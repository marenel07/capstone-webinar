import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, speaker, imageUrl, time, date } = body;

    const user = await getCurrentUser();

    if (!user?.idNumber) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title || !description || !speaker || !imageUrl || !time || !date) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const webinar = await prisma.webinar.create({
      data: {
        title,
        description,
        speaker,
        imageUrl,
        time,
        date,
        authorId: user.id,
        participants: {
          create: [
            {
              userId: user.id,
            },
          ],
        },
      },
    });

    revalidatePath("/");

    return NextResponse.json(webinar);
  } catch (error) {
    console.log("[WWEBINAR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
