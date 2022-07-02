import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class DictDto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    comment: '字典项名称',
  })
  dictName: string;

  @Column({
    unique: true,
    comment: '字典项值',
  })
  dictCode: string;

  @Column({
    comment: '字典描述',
    default: '',
  })
  dictDesc: string;

  @Column({
    comment: '当前字典组给子项的父级id',
    default: randomUUID().replace(/-/g, ''),
  })
  pid: string;
}
