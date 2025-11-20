import { Announcement } from 'src/announcements/announcement.model';

export function sortByUpdatedAtDesc(
  announcements: Announcement[],
): Announcement[] {
  return [...announcements].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}
