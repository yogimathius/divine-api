import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserYogaPose } from '../../user-yoga-pose/entities/user-yoga-pose.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType({ description: 'user ' })
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: false })
  @Field()
  online: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Column({ nullable: true, unique: true })
  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  @OneToMany(() => UserYogaPose, (userYogaPose) => userYogaPose.user)
  userYogaPoses: UserYogaPose[];
}

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field()
  expiration: number;

  @Field()
  user: User;
}
