import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictDto {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  dictName: string;

  @Column()
  dictCode: string;

  @Column()
  dictDesc: string;
}
