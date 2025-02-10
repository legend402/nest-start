import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/database/entity/article.entity';
import { BaseService } from 'src/service/BaseService';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ArticleService extends BaseService<ArticleDto> {
  constructor(
    @InjectRepository(ArticleDto)
    private readonly articleReq: Repository<ArticleDto>,
  ) {
    super(articleReq);
  }
}
