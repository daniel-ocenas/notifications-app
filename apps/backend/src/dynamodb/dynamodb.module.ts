import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'DYNAMO_CLIENT',
      useFactory: () => {
        return new DynamoDBClient({
          region: 'eu-west-1',
          endpoint: process.env.DYNAMO_CLIENT_URL, // dynamodb-local
        });
      },
    },
  ],
  exports: ['DYNAMO_CLIENT'],
})
export class DynamoDbModule {}
