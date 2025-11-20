"use client";

import AnnouncementsTableSection from "@/components/announcements/announcements-table-section";
import { Toaster } from "sonner";

export default function Announcements() {
  return (
    <div>
      <Toaster position="top-center" richColors />
      <h2 className={"text-2xl font-bold mb-12"}>Announcements</h2>
      <AnnouncementsTableSection />
      <a href={"/announcements/new"} className={"flex justify-self-end"}>
        <button className=" bg-yellow-500 mt-8 px-4 py-2 rounded-3xl hover:bg-yellow-600 cursor-pointer">
          Create new announcement
        </button>
      </a>
    </div>
  );
}
