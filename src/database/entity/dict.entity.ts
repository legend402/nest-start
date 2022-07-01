import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictDto {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    nullable: true,
    comment: '字典项名称',
  })
  dictName: string;

  @Column({
    nullable: true,
    unique: true,
    comment: '字典项值',
  })
  dictCode: string;

  @Column({
    comment: '字典描述',
  })
  dictDesc: string;

  @Column({
    comment: '当前字典组给子项的父级id',
  })
  pid: string;
}
