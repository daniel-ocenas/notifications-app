"use client";
import { OnSubmitActionProps } from "@/components/announcements/announcement-form";
import {
  CreateAnnouncementInput,
  CreateAnnouncementResponse,
} from "@/graphql/announcements";
import { CREATE_ANNOUNCEMENT } from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";

export const useCreateAnnouncement = () => {
  const router = useRouter();

  const [createAnnouncement] = useMutation<
    CreateAnnouncementResponse,
    { input: CreateAnnouncementInput }
  >(CREATE_ANNOUNCEMENT);

  const handleCreateSubmit = async (announcement: OnSubmitActionProps) => {
    const input: CreateAnnouncementInput = {
      title: announcement.title,
      content: announcement.content,
      publicationDate: announcement.publicationDate,
      category: announcement.category,
    };

    try {
      const result = await createAnnouncement({ variables: { input } });

      if (result.data) {
        router.push("/announcements");
        router.replace("/announcements");
      }
    } catch (err) {
      console.error("Error creating announcement:", err);
    }
  };
  return { handleCreateSubmit };
};
