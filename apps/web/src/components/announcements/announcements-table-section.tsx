import AnnouncementsTable from "@/components/announcements/announcements-table";
import { useGetAnnouncements } from "@/components/announcements/hooks/use-get-announcements";

export default function AnnouncementsTableSection() {
  const { announcements, loading, error } = useGetAnnouncements();

  if (loading) return <div>Loading announcements...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <AnnouncementsTable announcements={announcements} />;
}
