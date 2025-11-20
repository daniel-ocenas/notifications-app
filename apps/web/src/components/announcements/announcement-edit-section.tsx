"use client";
import AnnouncementForm from "@/components/announcements/announcement-form";
import { useGetAnnouncement } from "@/components/announcements/hooks/use-get-announcement";
import { useUpdateAnnouncement } from "@/components/announcements/hooks/use-update-announcement";

type AnnouncementEditSectionProps = {
  id: string;
};

export default function AnnouncementEditSection({
  id,
}: AnnouncementEditSectionProps) {
  const { announcement, loading, error } = useGetAnnouncement(id);
  const { handleUpdateSubmit } = useUpdateAnnouncement();

  if (loading) return <div>Loading announcement...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={"w-full"}>
      <AnnouncementForm
        announcement={announcement}
        onSubmitAction={handleUpdateSubmit}
      />
    </div>
  );
}
