import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'create_time',
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: 6,
  })
  createTime!: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: 6,
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
