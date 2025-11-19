import { Module } from '@nestjs/common';
import { AnnouncementsGateway } from 'src/announcements/announcements.gateway';
import { AnnouncementsResolver } from './announcements.resolver';
import { AnnouncementsService } from './announcements.service';

@Module({
  providers: [
    AnnouncementsResolver,
    AnnouncementsGateway,
    AnnouncementsService,
  ],
})
export class AnnouncementsModule {}
