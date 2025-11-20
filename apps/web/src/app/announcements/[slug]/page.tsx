import AnnouncementEditSection from "@/components/announcements/announcement-edit-section";

type Params = Promise<{ slug: string }>;

export default async function AnnouncementPage({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <div>
      <h2 className={"text-2xl font-bold mb-12"}>Edit The Announcement</h2>
      <AnnouncementEditSection id={slug} />
    </div>
  );
}
