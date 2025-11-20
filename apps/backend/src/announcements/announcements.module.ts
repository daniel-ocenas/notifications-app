import { Module } from '@nestjs/common';
import { AnnouncementsGateway } from 'src/announcements/announcements.gateway';
import { AnnouncementsResolver } from './announcements.resolver';
import { AnnouncementsService } from './announcements.service';
import { DynamoDbModule } from 'src/dynamodb/dynamodb.module';
import { ANNOUNCEMENTS_REPOSITORY } from './announcements.repository';
import { DynamoDbAnnouncementsRepository } from './dynamodb.announcements.repository';

@Module({
  imports: [DynamoDbModule],
  providers: [
    AnnouncementsResolver,
    AnnouncementsGateway,
    AnnouncementsService,
    { provide: ANNOUNCEMENTS_REPOSITORY, useClass: DynamoDbAnnouncementsRepository },
  ],
})
export class AnnouncementsModule {}
