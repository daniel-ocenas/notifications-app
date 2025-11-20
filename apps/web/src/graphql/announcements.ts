"use client";
import { Announcement } from "@/components/announcements/announcements.types";

export type GetAnnouncementData = {
  announcement: Announcement;
};

export type GetAnnouncementVars = {
  id: string;
};

export type GetAnnouncementsData = {
  announcements: Announcement[];
};

export type CreateAnnouncementInput = {
  title: string;
  content: string;
  category: string[];
  publicationDate: string;
};

export type CreateAnnouncementResponse = {
  createAnnouncement: {
    id: string;
    title: string;
    content: string;
    category: string[];
    publicationDate: string;
    updatedAt: string;
  };
};

export interface UpdateAnnouncementInput extends CreateAnnouncementInput {
  id: string;
}

export type UpdateAnnouncementResponse = {
  updateAnnouncement: {
    id: string;
    title: string;
    content: string;
    category: string[];
    publicationDate: string;
    updatedAt: string;
  };
};
