import AnnouncementsTable from "@/components/announcements/announcements-table";
import { useAnnouncementsState } from "@/components/announcements/hooks/use-announcements-state";
import { useGetAnnouncements } from "@/components/announcements/hooks/use-get-announcements";

export default function AnnouncementsTableSection() {
  const {
    announcements: queryAnnouncements,
    loading,
    error,
  } = useGetAnnouncements();
  const { announcements } = useAnnouncementsState(queryAnnouncements);

  if (loading) return <div>Loading announcements...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <AnnouncementsTable announcements={announcements} />;
}
