"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface VideoPlayerModalProps {
  videoUrl: string;
  open: boolean;
  onClose: () => void;
  title: string;
}

const VideoPlayerModal = ({
  videoUrl,
  open,
  onClose,
  title,
}: VideoPlayerModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl pt-9">
        <MediaPlayer title={title} src={videoUrl}>
          <MediaProvider />
          <DefaultVideoLayout
            icons={defaultLayoutIcons}
            thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
          />
        </MediaPlayer>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
