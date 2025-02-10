import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleDto } from './article.entity';

@Entity('user')
export class User {
  // 自增
  @PrimaryGeneratedColumn('uuid', {
    comment: '用户id',
  })
  userId: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @Column()
  realName: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    default: null,
  })
  email: string;

  @Column({
    default: 'user',
  })
  accessCodes: string;

  @Column({
    type: 'int',
    default: null,
  })
  age: number;

  @Column({
    type: 'varchar',
    default: null,
  })
  idCard: string;

  @Column({
    default: null,
  })
  avatar: number;

  @Column({
    default: null,
    comment: '性别 dictCode: sex',
  })
  sex: string;

  @OneToMany(() => ArticleDto, article => article.user)
  articles: ArticleDto[];
}
