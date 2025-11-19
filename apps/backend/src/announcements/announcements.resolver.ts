import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Announcement } from 'src/announcements/announcement.model';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementInput } from './dto/create-announcement.input';
import { UpdateAnnouncementInput } from './dto/update-announcement.input';

@Resolver(() => Announcement)
export class AnnouncementsResolver {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  // GET /announcements
  @Query(() => [Announcement], { name: 'announcements' })
  findAll() {
    Logger.log('Fetching announcements from database');
    return this.announcementsService.findAll();
  }

  // GET /announcements/:id
  @Query(() => Announcement, { name: 'announcement' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.announcementsService.findOne(id);
  }

  // POST /announcements
  @Mutation(() => Announcement)
  createAnnouncement(@Args('input') input: CreateAnnouncementInput) {
    return this.announcementsService.create(input);
  }

  // PUT/PATCH /announcements/:id
  @Mutation(() => Announcement)
  updateAnnouncement(@Args('input') input: UpdateAnnouncementInput) {
    return this.announcementsService.update(input);
  }

  // DELETE /announcements/:id
  @Mutation(() => Boolean)
  deleteAnnouncement(@Args('id', { type: () => String }) id: string) {
    return this.announcementsService.remove(id);
  }
}
