import { Announcement } from "@/components/announcements/announcements.types";
import { useAnnouncementCreated } from "@/components/announcements/hooks/use-announcement-created";
import { useEffect, useState } from "react";

export const useAnnouncementsState = (initial: Announcement[]) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initial);

  // WS updates
  useAnnouncementCreated({
    onAnnouncementCreated: (newAnnouncement) => {
      setAnnouncements((prev) => {
        if (prev.some((a) => a.id === newAnnouncement.id)) return prev;
        return [newAnnouncement, ...prev];
      });
    },
  });

  // Sync initial query updates
  useEffect(() => {
    setAnnouncements(initial);
  }, [initial]);

  return { announcements, setAnnouncements };
};
