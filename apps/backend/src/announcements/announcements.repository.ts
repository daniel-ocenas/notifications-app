import { Announcement } from './announcement.model';
import { CreateAnnouncementInput } from './dto/create-announcement.input';
import { UpdateAnnouncementInput } from './dto/update-announcement.input';

export interface AnnouncementsRepository {
  create(input: CreateAnnouncementInput): Promise<Announcement>;
  findAll(): Promise<Announcement[]>;
  findOne(id: string): Promise<Announcement | null>;
  findByCategories(categories: string[]): Promise<Announcement[]>;
  update(input: UpdateAnnouncementInput): Promise<Announcement | null>;
  remove(id: string): Promise<boolean>;
}

export const ANNOUNCEMENTS_REPOSITORY = 'ANNOUNCEMENTS_REPOSITORY';
