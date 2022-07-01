import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DictDto } from 'src/database/entity/dict.entity';
import { DictListType } from './dict.interface';
import { DictService } from './dict.service';

@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Get('/list')
  async findALl(@Param() param: DictListType) {
    const { pageSize = 10, pageNum = 0 } = param;
    return this.dictService.findMany({
      take: pageSize,
      skip: pageNum,
    });
  }

  @Post('/add')
  async addOne(@Body() dict: DictDto) {
    const rowId = randomUUID().replace(/-/g, '');
    return this.dictService.saveOne({
      ...dict,
      pid: rowId,
    });
  }

  @Put('/edit')
  async edit(@Body() dict: DictDto) {
    return this.dictService.update(
      {
        id: dict.id,
      },
      dict,
    );
  }
}
