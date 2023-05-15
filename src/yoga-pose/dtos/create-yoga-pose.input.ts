import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType()
export class CreateYogaPoseInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  poseName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  poseDescription: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  poseImagePath: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  posePoints: number;
}
