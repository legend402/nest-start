import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import { ArticleDto } from 'src/database/entity/article.entity';
import { ArticleListType } from './article.interface';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
  ) {}

  @Get('/list')
  async findALl(@Param() param: ArticleListType) {
    const { pageSize = 10, pageNum = 0 } = param;
    return this.articleService.findMany({
      take: pageSize,
      skip: pageNum,
    });
  }

  @Get('/queryById')
  async findOne(@Param() param: ArticleDto) {
    return this.articleService.findOne({ where: param });
  }

  @Post('/add')
  async addOne(@Body() article: ArticleDto) {
    return this.articleService.saveOne(article);
  }

  @Put('/edit')
  async edit(@Body() article: ArticleDto) {
    return this.articleService.update(
      {
        id: article.id,
      },
      article,
    );
  }

  @Delete('/delete')
  async delete(@Body() article: ArticleDto) {
    // return this.articleService.delete(
    //   {
    //     id: article.id,
    //   },
    //   article,
    // );
  }
}
