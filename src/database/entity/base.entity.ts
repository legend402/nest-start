import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'create_time'
  })
  createTime!: Date;

  @UpdateDateColumn({
    name: 'update_time'
  })
  updateTime!: Date;

  @Column({
    default: 'hyj',
  })
  createBy: string;

  @Column({
    default: 1,
  })
  isDelete: 1 | 0;
}
