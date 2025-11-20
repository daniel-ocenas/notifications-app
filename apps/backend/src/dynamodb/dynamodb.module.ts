import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  waitUntilTableExists,
} from '@aws-sdk/client-dynamodb';
import { Injectable, Logger, Module, OnModuleInit } from '@nestjs/common';

@Injectable()
class DynamoDbAnnouncementsTableInit implements OnModuleInit {
  private readonly tableName = 'announcements';

  constructor(private readonly client: DynamoDBClient) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.client.send(
        new DescribeTableCommand({ TableName: this.tableName }),
      );
      Logger.log(
        `DynamoDB: Table "${this.tableName}" already exists. Skipping creation.`,
      );
      return;
    } catch (err: any) {
      if (err?.name !== 'ResourceNotFoundException') {
        Logger.error('DynamoDB: Failed to describe table', err as any);
        throw err;
      }
      Logger.log(
        `DynamoDB: Table "${this.tableName}" not found. Creating it...`,
      );
    }

    await this.client.send(
      new CreateTableCommand({
        TableName: this.tableName,
        BillingMode: 'PAY_PER_REQUEST',
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      }),
    );

    // Wait until ACTIVE
    await waitUntilTableExists(
      { client: this.client, maxWaitTime: 60 },
      { TableName: this.tableName },
    );
    Logger.log(`DynamoDB: Table "${this.tableName}" is ready.`);
  }
}

@Module({
  providers: [
    {
      provide: 'DYNAMO_CLIENT',
      useFactory: () => {
        return new DynamoDBClient({
          region: 'eu-west-1',
          endpoint: process.env.DYNAMO_CLIENT_URL,
          credentials: {
            accessKeyId: 'dummy',
            secretAccessKey: 'dummy',
          },
        });
      },
    },
    {
      provide: DynamoDbAnnouncementsTableInit,
      useFactory: (client: DynamoDBClient) =>
        new DynamoDbAnnouncementsTableInit(client),
      inject: ['DYNAMO_CLIENT'],
    },
  ],
  exports: ['DYNAMO_CLIENT'],
})
export class DynamoDbModule {}
