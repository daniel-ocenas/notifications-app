import { Announcement } from "@/components/announcements/announcements.types";
import { GetAnnouncementsData } from "@/graphql/announcements";
import { GET_ANNOUNCEMENTS } from "@/graphql/queries";
import { ErrorLike } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const useGetAnnouncements = (): {
  announcements: Announcement[];
  loading: boolean;
  error: ErrorLike | undefined;
} => {
  const { data, loading, error } = useQuery<GetAnnouncementsData>(
    GET_ANNOUNCEMENTS,
    { fetchPolicy: "cache-and-network" },
  );

  const announcements = data?.announcements || [];

  return { announcements, loading, error };
};
