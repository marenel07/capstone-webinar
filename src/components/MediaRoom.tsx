"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  formatChatMessageLinks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Disc2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  name: string | null;
}

export const MediaRoom = ({ chatId, video, audio, name }: MediaRoomProps) => {
  const [token, setToken] = useState("");
  const router = useRouter();

  async function onRecord() {
    try {
      await axios.post("/api/livekit/record", { chatId });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [chatId, name]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center h-screen">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      // connect={true}
      connectOptions={{ autoSubscribe: false }}
      video={video}
      audio={audio}
      style={{ height: "100vh" }}
      onDisconnected={() => router.back()}
    >
      <div className="w-full p-2 flex items-center  justify-end">
        <Disc2 onClick={onRecord} size={20} />
      </div>
      <VideoConference chatMessageFormatter={formatChatMessageLinks} />
    </LiveKitRoom>
  );
};
