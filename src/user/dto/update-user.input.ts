import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @MaxLength(30)
  @Field({ nullable: true })
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @MinLength(6)
  @MaxLength(20)
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  online?: boolean;

  @Field()
  @MinLength(6)
  @MaxLength(20)
  @IsOptional()
  bio?: string;
}
