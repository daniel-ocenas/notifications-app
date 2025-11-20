"use client";

import AnnouncementsTableSection from "@/components/announcements/announcements-table-section";

export default function Announcements() {
  return (
    <div>
      <h2 className={"text-2xl font-bold mb-12"}>Announcements</h2>
      <AnnouncementsTableSection />
      <a href={"/announcements/new"}>
        <button className=" bg-yellow-500 mt-8 px-4 py-2 rounded-3xl hover:bg-yellow-600 cursor-pointer">
          Create new announcement
        </button>
      </a>
    </div>
  );
}
