import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  req: Request,
  { params }: { params: { webinarId: string } }
) {
  try {
    if (!params.webinarId) {
      return new NextResponse("Webinar id is required", { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY as string,
      },
    });

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET, // replace with your bucket name
      Key: `livekit/${params.webinarId}.mp4`, // replace with the filename you want to download
    });

    await s3.send(command);

    const url = `https://${process.env.BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/livekit/${params.webinarId}.mp4`;

    return NextResponse.json(url);
  } catch (error: any) {
    console.log("[WWEBINAR_POST]", error);
    if (error.name === "NoSuchKey") {
      return new NextResponse("Recording not found", { status: 404 });
    } else {
      return new NextResponse("Internal error", { status: 500 });
    }
  }
}
