import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'DYNAMO_CLIENT',
      useFactory: () => {
        return new DynamoDBClient({
          region: 'eu-west-1',
          endpoint: 'http://localhost:8000', // dynamodb-local
        });
      },
    },
  ],
  exports: ['DYNAMO_CLIENT'],
})
export class DynamoDbModule {}
