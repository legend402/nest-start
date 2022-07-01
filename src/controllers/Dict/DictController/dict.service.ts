import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictDto } from 'src/database/entity/dict.entity';
import { BaseService } from 'src/service/BaseService';
import { Repository } from 'typeorm';

@Injectable()
export class DictService extends BaseService<DictDto> {
  constructor(
    @InjectRepository(DictDto) private readonly dictReq: Repository<DictDto>,
  ) {
    super(dictReq);
  }
}
