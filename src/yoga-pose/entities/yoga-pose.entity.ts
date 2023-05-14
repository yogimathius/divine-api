import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class YogaPose {
  @PrimaryGeneratedColumn()
  pose_id: number;

  @Column()
  pose_name: string;

  @Column('text')
  pose_description: string;

  @Column()
  pose_image_path: string;

  @Column()
  pose_points: number;
}
