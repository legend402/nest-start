import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity('article')
export class ArticleDto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'createBy' })
  user: User;
}
