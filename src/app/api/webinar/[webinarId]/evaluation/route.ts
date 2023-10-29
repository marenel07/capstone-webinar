import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { certificateGenerator } from "@/lib/certificateGenerator";
import { utapi } from "@/lib/uploadthing";

export async function PATCH(
  req: Request,
  { params }: { params: { webinarId: string } }
) {
  try {
    const body = await req.json();
    const { userId, certificate } = body;

    if (!params.webinarId) {
      return new NextResponse("Webinar id is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("All fields are required", { status: 400 });
    }
    if (!certificate) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const user = await getCurrentUser();

    const currentWebinar = await prisma.webinar.findUnique({
      where: {
        id: params.webinarId,
      },
    });

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const isEvaluated = await prisma.webinar.findFirst({
      where: {
        id: params.webinarId,
        participants: {
          some: {
            evaluated: true,
          },
        },
      },
    });

    if (isEvaluated) {
      return new NextResponse("Already evaluated", { status: 400 });
    }

    await prisma.webinar.update({
      where: {
        id: params.webinarId,
      },
      data: {
        participants: {
          updateMany: {
            where: {
              userId,
            },
            data: {
              evaluated: true,
            },
          },
        },
      },
    });

    const webinar = await prisma.webinar.update({
      where: {
        id: params.webinarId,
      },
      data: {
        participants: {
          updateMany: {
            where: {
              userId,
              evaluated: true,
            },
            data: {
              certificateUrl: certificate,
            },
          },
        },
      },
    });

    return NextResponse.json(webinar);
    return null;
  } catch (error) {
    console.log("[WWEBINAR_REGISTRATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
