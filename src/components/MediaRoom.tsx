"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  formatChatMessageLinks,
  useLiveKitRoom,
  useParticipants,
  useRoomContext,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Disc2, Loader2, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ActionTooltip } from "./ActionTooltip";
import { Room } from "livekit-client";
import Participants from "./modals/Participants";
import ParticipantsList from "./modals/Participants";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  name: string | null;
  isHost?: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  name,
  isHost,
}: MediaRoomProps) => {
  const [token, setToken] = useState("");
  const [egressId, setEgressId] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function onRecord() {
    try {
      await axios
        .post("/api/livekit/record", { chatId })
        .then((response) => {
          setEgressId(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  async function onStopRecord() {
    try {
      await axios.post("/api/livekit/stop", { egressId }).then(() => {
        setEgressId("");
      });
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
      connectOptions={{ autoSubscribe: true }}
      video={video}
      audio={audio}
      style={{ height: "100dvh" }}
      onDisconnected={() => router.back()}
    >
      <ParticipantNames open={open} onClose={() => setOpen(false)} />
      <div className="container py-2 pr-6 flex items-center  justify-end">
        {isHost &&
          (egressId !== "" ? (
            <ActionTooltip label="Stop recording">
              <Disc2
                onClick={onStopRecord}
                className="h-6 w-6 cursor-pointer animate-pulse text-rose-500"
              />
            </ActionTooltip>
          ) : (
            <ActionTooltip label="Start record">
              <Disc2 onClick={onRecord} className="h-6 w-6 cursor-pointer" />
            </ActionTooltip>
          ))}

        <ActionTooltip label="Participants">
          <Users2
            onClick={() => setOpen(true)}
            size={20}
            className="cursor-pointer ml-4"
          />
        </ActionTooltip>
      </div>

      <VideoConference
        chatMessageFormatter={formatChatMessageLinks}
        style={{ height: "calc(100vh - 40px)" }}
      />
    </LiveKitRoom>
  );
};

interface ParticipantNamesProps {
  open: boolean;
  onClose: () => void;
}

const ParticipantNames = ({ open, onClose }: ParticipantNamesProps) => {
  const participants = useParticipants();

  // Get the names of all participants
  const participantNames = participants.map(
    (participant) => participant.identity
  );
  return (
    <ParticipantsList
      participants={participantNames}
      open={open}
      onClose={onClose}
    />
  );

  // Render the participant names...
};
