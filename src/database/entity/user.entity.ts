import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleDto } from './article.entity';

@Entity('user')
export class User {
  // 自增
  @PrimaryGeneratedColumn('uuid', {
    comment: '用户id',
  })
  userId: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @Column()
  realName: string;

  @IsNotEmpty()
  @Column({
    select: false,
  })
  password: string;

  @Column({
    default: null,
  })
  email: string;

  @Column({
    default: '3',
  })
  accessCodes: string;

  @Column({
    type: 'int',
    default: null,
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
  avatar: number;

  @OneToMany(() => ArticleDto, article => article.user)
  articles: ArticleDto[];
}
