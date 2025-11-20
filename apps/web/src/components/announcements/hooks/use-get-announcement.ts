import { Announcement } from "@/components/announcements/announcements.types";
import {
  GetAnnouncementData,
  GetAnnouncementVars,
} from "@/graphql/announcements";
import { GET_ANNOUNCEMENT } from "@/graphql/queries";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const useGetAnnouncement = (
  id: string,
): {
  announcement: Announcement | undefined;
  loading: boolean;
  error: ErrorLike | undefined;
} => {
  const { data, loading, error } = useQuery<
    GetAnnouncementData,
    GetAnnouncementVars
  >(GET_ANNOUNCEMENT, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    skip: !id,
  });

  return {
    announcement: data?.announcement,
    loading,
    error,
  };
};
