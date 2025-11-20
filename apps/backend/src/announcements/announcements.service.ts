import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AnnouncementsGateway } from 'src/announcements/announcements.gateway';
import { Announcement } from './announcement.model';
import type { AnnouncementsRepository } from './announcements.repository';
import { ANNOUNCEMENTS_REPOSITORY } from './announcements.repository';
import { CreateAnnouncementInput } from './dto/create-announcement.input';
import { UpdateAnnouncementInput } from './dto/update-announcement.input';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly announcementsGateway: AnnouncementsGateway,
    @Inject(ANNOUNCEMENTS_REPOSITORY)
    private readonly repo: AnnouncementsRepository,
  ) {}

  async create(input: CreateAnnouncementInput): Promise<Announcement> {
    const announcement = await this.repo.create(input);

    this.announcementsGateway.emitAnnouncementCreated({ ...announcement });

    Logger.log(`New announcement created: ${announcement.id}`);
    return announcement;
  }

  async findAll(): Promise<Announcement[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.repo.findOne(id);

    if (!announcement) {
      throw new NotFoundException(`Announcement with id "${id}" not found`);
    }

    return announcement;
  }

  async findByCategories(categories: string[]): Promise<Announcement[]> {
    return this.repo.findByCategories(categories ?? []);
  }

  async update(input: UpdateAnnouncementInput): Promise<Announcement> {
    const updated = await this.repo.update(input);

    if (!updated) {
      throw new NotFoundException(
        `Announcement with id "${input.id}" not found`,
      );
    }

    this.announcementsGateway.emitAnnouncementUpdated({ ...updated });

    Logger.log(`Updated announcement with id: ${updated.id}`);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const existing = await this.repo.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Announcement with id "${id}" not found`);
    }
    const rm = await this.repo.remove(id);
    Logger.log(`Deleted announcement with id: ${id}`);
    return rm;
  }
}
