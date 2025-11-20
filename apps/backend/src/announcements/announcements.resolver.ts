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
    Logger.log('Going to fetch announcements from database');
    return this.announcementsService.findAll();
  }

  // GET /announcement/:id
  @Query(() => Announcement, { name: 'announcement' })
  findOne(@Args('id', { type: () => String }) id: string) {
    Logger.log(`Going to find announcement with id: ${id} `);
    return this.announcementsService.findOne(id);
  }

  // GET /announcementsByCategories/:category
  @Query(() => [Announcement], { name: 'announcementsByCategories' })
  findByCategories(
    @Args({ name: 'categories', type: () => [String], nullable: true })
    categories?: string[],
  ): Announcement[] {
    return this.announcementsService.findByCategories(categories ?? []);
  }

  // POST /announcements
  @Mutation(() => Announcement)
  createAnnouncement(@Args('input') input: CreateAnnouncementInput) {
    Logger.log(`Going to create announcement with title: ${input.title} `);
    return this.announcementsService.create(input);
  }

  // PUT/PATCH /announcements/:id
  @Mutation(() => Announcement)
  updateAnnouncement(@Args('input') input: UpdateAnnouncementInput) {
    Logger.log(`Going to update announcement with id: ${input.id} `);
    return this.announcementsService.update(input);
  }

  // DELETE /announcements/:id
  @Mutation(() => Boolean)
  deleteAnnouncement(@Args('id', { type: () => String }) id: string) {
    Logger.log(`Going to delete announcement with id: ${id} `);
    return this.announcementsService.remove(id);
  }
}
