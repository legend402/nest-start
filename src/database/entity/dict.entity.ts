import { randomUUID } from 'crypto';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { BaseEntity } from './base.entity';
import {DictItemDto} from "./dictItem.entity";
@Entity()
export class DictDto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
