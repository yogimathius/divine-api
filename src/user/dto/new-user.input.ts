import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

@InputType()
export class NewUserInput {
  @Exclude()
  @IsOptional()
  id: number;

  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  email: string;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
