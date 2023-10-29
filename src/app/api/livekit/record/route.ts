import { EgressClient, EncodedFileType } from "livekit-server-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { chatId } = body;

    const egressClient = new EgressClient(
      process.env.NEXT_PUBLIC_LIVEKIT_URL as string,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET
    );

    const output = {
      fileType: EncodedFileType.MP4,
      filepath: `livekit/${chatId}.mp4`,
      s3: {
        accessKey: process.env.AWS_ACCESS_KEY,
        secret: process.env.AWS_ACCESS_SECRET,
        region: process.env.AWS_REGION,
        bucket: process.env.BUCKET,
      },
    };

    const info = await egressClient.startRoomCompositeEgress(chatId, output, {
      layout: "speaker",
      // uncomment to use your own templates
      // customBaseUrl: 'https://my-template-url.com',
    });

    const file = info.status;
    console.log(file);
    return NextResponse.json(info);
  } catch (error) {
    console.log(error, "RECORD_POST");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
