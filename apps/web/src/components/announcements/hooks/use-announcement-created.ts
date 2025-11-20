import { Announcement } from "@/components/announcements/announcements.types";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

type UseAnnouncementsSocketParams = {
  onAnnouncementCreated: (announcement: Announcement) => void;
};

export const useAnnouncementCreated = ({
  onAnnouncementCreated,
}: UseAnnouncementsSocketParams) => {
  useEffect(() => {
    const socket: Socket = io(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements`,
    );

    socket.on("announcementCreated", (payload: Announcement) => {
      onAnnouncementCreated(payload);
      toast.info("New announcement created!");
    });

    return () => {
      socket.disconnect();
    };
  }, [onAnnouncementCreated]);
};
