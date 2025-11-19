import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function AnnouncementPage({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <div>
      <h2 className={"text-2xl font-bold"}>Edit The Announcement</h2>
      <p>Title: {slug}</p>
      <p>Content: //text</p>
      <p>Category: multiselect min 1 </p>
      <p>Publication Date: date select</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
