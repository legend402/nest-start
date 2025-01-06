import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../service/BaseService';
import { UploadDto } from 'src/database/entity/upload.entity';

@Injectable()
export class UploadService extends BaseService<UploadDto> {
  constructor(
    @InjectRepository(UploadDto) private readonly uploadReq: Repository<UploadDto>,
  ) {
    super(uploadReq);
  }
}
