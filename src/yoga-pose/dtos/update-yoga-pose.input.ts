import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { CreateYogaPoseInput } from './create-yoga-pose.input';

@InputType()
export class UpdateYogaPoseInput extends PartialType(CreateYogaPoseInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsInt()
  poseId: string;
}
