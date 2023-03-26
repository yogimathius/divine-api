import { ObjectType, Field, ID } from '@nestjs/graphql';
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

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: false })
  @Field()
  enabled: boolean;
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
