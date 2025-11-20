import { Announcement } from "@/components/announcements/announcements.types";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

type UseAnnouncementsSocketParams = {
  events: {
    onAnnouncementCreated?: (announcement: Announcement) => void;
    onAnnouncementUpdated?: (announcement: Announcement) => void;
  };
};

export const useAnnouncementsSocket = ({
  events,
}: UseAnnouncementsSocketParams) => {
  useEffect(() => {
    const socket: Socket = io(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements`,
    );

    if (events.onAnnouncementCreated) {
      socket.on("announcementCreated", (payload: Announcement) => {
        events.onAnnouncementCreated?.(payload);
        toast.info("New announcement created!");
      });
    }

    if (events.onAnnouncementUpdated) {
      socket.on("announcementUpdated", (payload: Announcement) => {
        events.onAnnouncementUpdated?.(payload);
        toast.info("Announcement updated");
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [events]);
};
