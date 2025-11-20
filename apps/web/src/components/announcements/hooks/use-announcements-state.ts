import { Announcement } from "@/components/announcements/announcements.types";
import { useAnnouncementsSocket } from "@/components/announcements/hooks/use-announcements-socket";
import { useEffect, useState } from "react";

export const useAnnouncementsState = (initial: Announcement[]) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initial);

  // WS updates
  useAnnouncementsSocket({
    events: {
      onAnnouncementCreated: (newAnnouncement) => {
        setAnnouncements((prev) => {
          if (prev.some((a) => a.id === newAnnouncement.id)) return prev;
          return [newAnnouncement, ...prev];
        });
      },
      onAnnouncementUpdated: (updatedAnnouncement) => {
        setAnnouncements((prev) => {
          const withoutOld = prev.filter(
            (a) => a.id !== updatedAnnouncement.id,
          );
          return [updatedAnnouncement, ...withoutOld];
        });
      },
    },
  });

  // Sync initial query updates
  useEffect(() => {
    setAnnouncements(initial);
  }, [initial]);

  return { announcements, setAnnouncements };
};
