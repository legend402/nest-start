import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @Column({
    default: 'hyj',
  })
  createBy: string;

  @Column({
    default: 1,
  })
  isDelete: 1 | 0;
}
