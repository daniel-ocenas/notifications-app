import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDbModule } from './dynamodb/dynamodb.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AnnouncementsModule,
    DynamoDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
