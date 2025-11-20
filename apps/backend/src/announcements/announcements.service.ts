import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AnnouncementsGateway } from 'src/announcements/announcements.gateway';
import { Announcement } from './announcement.model';
import { CreateAnnouncementInput } from './dto/create-announcement.input';
import { UpdateAnnouncementInput } from './dto/update-announcement.input';

@Injectable()
export class AnnouncementsService {
  private announcements: Announcement[] = [];

  constructor(private readonly announcementsGateway: AnnouncementsGateway) {}

  create(input: CreateAnnouncementInput): Announcement {
    const now = new Date();
    const announcement: Announcement = {
      id: randomUUID(),
      ...input,
      updatedAt: now,
    };

    // replace with database insert
    this.announcements.push(announcement);

    this.announcementsGateway.emitAnnouncementCreated({ ...announcement });

    Logger.log(`New announcement created: ${announcement.id}`);
    return announcement;
  }

  findAll(): Announcement[] {
    // replace with database search
    return this.announcements.sort((a, b) => {
      // newest first
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  findOne(id: string): Announcement {
    const announcement = this.announcements.find((a) => a.id === id);
    if (!announcement) {
      throw new NotFoundException(`Announcement with id "${id}" not found`);
    }

    return announcement;
  }

  update(input: UpdateAnnouncementInput): Announcement {
    const index = this.announcements.findIndex((a) => a.id === input.id);
    if (index === -1) {
      throw new NotFoundException(
        `Announcement with id "${input.id}" not found`,
      );
    }

    const existing = this.announcements[index];
    const updated: Announcement = {
      ...existing,
      ...input,
      updatedAt: new Date(),
    };

    // replace with database update
    this.announcements[index] = updated;

    Logger.log(`Updated announcement with id: ${updated.id}`);
    return updated;
  }

  remove(id: string): boolean {
    const index = this.announcements.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Announcement with id "${id}" not found`);
    }
    // replace with database delete
    this.announcements.splice(index, 1);
    Logger.log(`Deleted announcement with id: ${id}`);
    return true;
  }
}
