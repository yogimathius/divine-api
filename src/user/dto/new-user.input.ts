import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @Field({ nullable: true })
  @MinLength(6)
  @MaxLength(20)
  @IsOptional()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  email?: string;
}
