import { BaseEntity } from 'src/database/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploadDto extends BaseEntity {
  // 自增
  @PrimaryGeneratedColumn('uuid', {
    comment: '文件id',
  })
  id: number;

  @Column()
  filename: string;

  @Column()
  filePath: string;

  @Column()
  fileSize: number;

  @Column()
  fileOriginalName: string;
}
