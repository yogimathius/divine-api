import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Number)
  id: number;

  @MaxLength(30)
  @IsOptional()
  name: string;

  @Field()
  email: string;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
