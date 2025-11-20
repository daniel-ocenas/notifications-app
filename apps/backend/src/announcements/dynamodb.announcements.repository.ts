import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { sortByUpdatedAtDesc } from 'src/uitls/sort-utils';
import { Announcement } from './announcement.model';
import { AnnouncementsRepository } from './announcements.repository';
import { CreateAnnouncementInput } from './dto/create-announcement.input';
import { UpdateAnnouncementInput } from './dto/update-announcement.input';

@Injectable()
export class DynamoDbAnnouncementsRepository
  implements AnnouncementsRepository
{
  private docClient: DynamoDBDocumentClient;
  private tableName = process.env.ANNOUNCEMENTS_TABLE || 'announcements';

  constructor(
    @Inject('DYNAMO_CLIENT') private readonly client: DynamoDBClient,
  ) {
    this.docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }

  async create(input: CreateAnnouncementInput): Promise<Announcement> {
    const now = new Date();
    const item: Announcement = {
      id: randomUUID(),
      ...input,
      updatedAt: now,
    };

    await this.docClient.send(
      new PutCommand({ TableName: this.tableName, Item: this.serialize(item) }),
    );
    Logger.log(`DynamoDB: inserted announcement ${item.id}`);
    return item;
  }

  async findAll(): Promise<Announcement[]> {
    const res = await this.docClient.send(
      new ScanCommand({ TableName: this.tableName }),
    );
    const items = (res.Items || []).map((i) => this.deserialize(i));
    return sortByUpdatedAtDesc(items);
  }

  async findOne(id: string): Promise<Announcement | null> {
    const res = await this.docClient.send(
      new GetCommand({ TableName: this.tableName, Key: { id } }),
    );
    if (!res.Item) return null;
    return this.deserialize(res.Item);
  }

  async findByCategories(categories: string[]): Promise<Announcement[]> {
    if (!categories || categories.length === 0) return this.findAll();
    // Minimal implementation: scan and filter client-side
    const res = await this.docClient.send(
      new ScanCommand({ TableName: this.tableName }),
    );
    const items = (res.Items || [])
      .map((i) => this.deserialize(i))
      .filter((a) => a.category.some((c) => categories.includes(c)));
    return sortByUpdatedAtDesc(items);
  }

  async update(input: UpdateAnnouncementInput): Promise<Announcement | null> {
    const existing = await this.findOne(input.id);
    if (!existing) return null;
    const updated: Announcement = {
      ...existing,
      ...input,
      updatedAt: new Date(),
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: this.serialize(updated),
      }),
    );
    Logger.log(`DynamoDB: updated announcement ${updated.id}`);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    await this.docClient.send(
      new DeleteCommand({ TableName: this.tableName, Key: { id } }),
    );
    Logger.log(`DynamoDB: deleted announcement ${id}`);
    return true;
  }

  private serialize(a: Announcement): Record<string, any> {
    return {
      ...a,
      updatedAt: new Date(a.updatedAt).toISOString(),
      publicationDate: new Date(a.publicationDate).toISOString(),
    };
  }

  private deserialize(i: Record<string, any>): Announcement {
    return {
      id: i.id as string,
      title: i.title as string,
      content: i.content as string,
      category: (i.category as string[]) || [],
      publicationDate: new Date(i.publicationDate as string),
      updatedAt: new Date(i.updatedAt as string),
    };
  }
}
