import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateAnnouncementInput } from './create-announcement.input';

@InputType()
export class UpdateAnnouncementInput extends PartialType(
  CreateAnnouncementInput,
) {
  @Field(() => ID)
  id: string;
}
