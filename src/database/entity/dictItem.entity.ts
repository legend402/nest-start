import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class DictItemDto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    comment: '字典值',
  })
  value: string;

  @Column({
    comment: '中文名称',
  })
  label: string;

  @Column({
    comment: '当前组的父级id',
  })
  pid: string;

  @Column({
    comment: '排序',
  })
  sort: number;

  @Column({
    default: '',
    comment: '备注',
  })
  desc: string;

  @Column({
    default: 1,
    comment: '状态 1:启用 0:禁用',
  })
  status: number;
}
