import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { CreateYogaPoseInput } from './create-yoga-pose.input';

@InputType()
export class UpdateYogaPoseInput extends PartialType(CreateYogaPoseInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  poseId: number;
}
