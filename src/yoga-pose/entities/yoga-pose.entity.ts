import { Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class YogaPose {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  pose_id: number;

  @Column({ unique: true })
  @Field()
  pose_name: string;

  @Column('text')
  @Field()
  pose_description: string;

  @Column()
  @Field()
  pose_image_path: string;

  @Column()
  @Field()
  pose_points: number;
}
