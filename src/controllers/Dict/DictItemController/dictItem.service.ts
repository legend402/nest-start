import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictItemDto } from 'src/database/entity/dictItem.entity';
import { BaseService } from 'src/service/BaseService';
import { Repository } from 'typeorm';

@Injectable()
export class DictItemService extends BaseService<DictItemDto> {
  constructor(
    @InjectRepository(DictItemDto)
    private readonly dictItemReq: Repository<DictItemDto>,
  ) {
    super(dictItemReq);
  }
}
