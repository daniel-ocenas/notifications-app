import AnnouncementsTable from "@/components/announcements/announcements-table";

export default function Announcements() {
  // load date from backend
  const announcements = [
    {
      id: 1,
      title: "title1",
      publicationDate: "2023-01-01",
      lastUpdate: "2023-01-02",
      categories: ["cat1", "cat2"],
    },
  ];

  return (
    <div>
      <h2 className={"text-2xl font-bold mb-12"}>Announcements</h2>
      <AnnouncementsTable announcements={announcements} />
    </div>
  );
}
