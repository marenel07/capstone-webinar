import { EgressClient, EncodedFileType } from "livekit-server-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { egressId } = body;

    const egressClient = new EgressClient(
      process.env.NEXT_PUBLIC_LIVEKIT_URL as string,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET
    );

    const info = await egressClient.stopEgress(egressId);

    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    console.log(error, "STOP_RECORD_POST");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
