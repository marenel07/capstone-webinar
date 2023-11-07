import {
  EgressClient,
  EncodedFileType,
  EncodingOptionsPreset,
} from "livekit-server-sdk";
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
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_ACCESS_SECRET_KEY,
        region: process.env.AWS_REGION,
        bucket: process.env.BUCKET,
      },
    };

    const encodingOption = EncodingOptionsPreset.H264_1080P_30;

    const info = await egressClient.startRoomCompositeEgress(chatId, output, {
      layout: "speaker",
      encodingOptions: encodingOption,
    });

    const egressId = info.egressId;

    return NextResponse.json(egressId, { status: 200 });
  } catch (error) {
    console.log(error, "RECORD_POST");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
