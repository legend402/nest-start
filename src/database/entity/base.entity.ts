import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'create_time',
    type: "timestamp",
    precision: 6,
  })
  createTime!: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    precision: 6,
  })
  updateTime!: Date;

  @Column({
    default: null,
  })
  createBy: string;

  @Column({
    default: null,
  })
  updateBy: string;

  @Column({
    default: 1,
  })
  isDelete: 1 | 0;
}
