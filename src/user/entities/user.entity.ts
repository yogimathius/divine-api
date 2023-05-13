import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'user ' })
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: false })
  @Field()
  online: boolean;

  @Column()
  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Column({ unique: true })
  @Field({ nullable: true })
  @IsOptional()
  email?: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  token: string;

  @Field()
  expiration: number;

  @Field()
  user: User;
}
