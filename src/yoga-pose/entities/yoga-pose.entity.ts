import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class YogaPose {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  poseId: number;

  @Column({ unique: true })
  @Field()
  poseName: string;

  @Column('text')
  @Field()
  poseDescription: string;

  @Column()
  @Field()
  poseImagePath: string;

  @Column()
  @Field()
  posePoints: number;
}
