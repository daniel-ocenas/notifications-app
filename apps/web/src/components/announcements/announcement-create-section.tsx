"use client";
import AnnouncementForm from "@/components/announcements/announcement-form";
import { useCreateAnnouncement } from "@/components/announcements/hooks/use-create-announcement";

export default function AnnouncementCreateSection() {
  const { handleCreateSubmit } = useCreateAnnouncement();

  return (
    <div className={"w-full"}>
      <AnnouncementForm onSubmitAction={handleCreateSubmit} />
    </div>
  );
}
