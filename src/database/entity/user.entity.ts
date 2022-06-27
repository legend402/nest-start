import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // 自增
  @PrimaryGeneratedColumn('uuid', {
    comment: '用户id',
  })
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column({
    select: false,
  })
  password: string;

  @Column()
  email: string;

  @Column({
    default: '3',
  })
  authority: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  idCard: string;

  @Column({
    default: null,
  })
  pictureId: number;
}
