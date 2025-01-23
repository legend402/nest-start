import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query, Req,
} from '@nestjs/common';
import { ArticleDto } from 'src/database/entity/article.entity';
import { ArticleListType } from './article.interface';
import { ArticleService } from './article.service';
import {Request} from "express";
import {getRequestTokenUser, safeLike} from "../../utils";
import {UserService} from "../userController/user.service";

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
  ) {}

  @Get('/list')
  async findALl(@Query() param: ArticleListType) {
    const { pageSize = 10, pageNum = 1, title } = param;
    const res = await this.articleService.findAll({
      where: {
        title: safeLike(title),
      },
    })
    return {
      items: res.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: res.length,
      pageSize: +pageSize,
      pageNum: +pageNum,
    };
  }

  @Get('/queryById')
  async findOne(@Param() param: ArticleDto) {
    return this.articleService.findOne({ where: param });
  }

  @Post('/add')
  async addOne(@Body() article: ArticleDto, @Req() req: Request) {
    const { username } = getRequestTokenUser(req);
    article.user = await this.userService.findOne({ where: { username } });
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
  async delete(@Query() article: ArticleDto) {
    return this.articleService.delete(
      {
        id: article.id,
      },
    );
  }
}
