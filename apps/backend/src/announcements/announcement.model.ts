import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Announcement {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [String])
  category: string[];

  @Field()
  publicationDate: Date;

  @Field()
  updatedAt: Date;
}
