import { OnSubmitActionProps } from "@/components/announcements/announcement-form";
import {
  UpdateAnnouncementInput,
  UpdateAnnouncementResponse,
} from "@/graphql/announcements";
import { UPDATE_ANNOUNCEMENT } from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";

export const useUpdateAnnouncement = () => {
  const router = useRouter();
  const [updateAnnouncement] = useMutation<
    UpdateAnnouncementResponse,
    { input: UpdateAnnouncementInput }
  >(UPDATE_ANNOUNCEMENT);

  const handleUpdateSubmit = async (announcement: OnSubmitActionProps) => {
    const input: UpdateAnnouncementInput = {
      id: announcement.id ?? "",
      title: announcement.title,
      content: announcement.content,
      publicationDate: announcement.publicationDate,
      category: announcement.category,
    };

    try {
      const result = await updateAnnouncement({ variables: { input } });

      if (result.data) {
        router.push("/announcements");
        router.replace("/announcements");
      }
    } catch (err) {
      console.error("Error creating announcement:", err);
    }
  };
  return { handleUpdateSubmit };
};
