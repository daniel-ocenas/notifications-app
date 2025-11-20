"use client";
import { ROUTES, ASSETS } from "@/utils/constants";
import Image from "next/image";

export default function AnnouncementsEditLinkCell({ id }: { id: string }) {
  return (
    <a
      href={ROUTES.announcementDetails(id)}
      className="absolute top-0 right-0 hover:shadow-xl active:scale-90"
    >
      <Image
        src={ASSETS.icons.edit}
        alt="edit-icon"
        width={28}
        height={28}
        loading="lazy"
      />
    </a>
  );
}
