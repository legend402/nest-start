import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../service/BaseService';
import { Upload } from 'src/database/entity/upload.entity';

@Injectable()
export class UploadService extends BaseService<Upload> {
  constructor(
    @InjectRepository(Upload) private readonly uploadReq: Repository<Upload>,
  ) {
    super(uploadReq);
  }
}
