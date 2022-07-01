import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictItemDto {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    nullable: true,
    unique: true,
    comment: '字典值',
  })
  value: string;

  @Column({
    nullable: true,
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
