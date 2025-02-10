import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import { DictItemDto } from 'src/database/entity/dictItem.entity';
import { DictItemService } from './dictItem.service';
import {PageType} from "../../../types/common";

interface ListSearch extends PageType {
  dictCode: string
}

@Controller('dictItem')
export class DictItemController {
  constructor(private readonly dictItemService: DictItemService) {}

  @Post('add')
  async addOne(@Body() dictItem: DictItemDto) {
    return this.dictItemService.saveOne(dictItem);
  }
  @Put('edit')
  async editOne(@Body() dictItem: DictItemDto) {
    console.log(dictItem)
    return this.dictItemService.update({
      id: dictItem.id,
    }, dictItem);
  }
  @Get('/list')
  async getAll(@Query() param: PageType) {
    const { pageSize = 10, pageNum = 1 } = param;
    return this.dictItemService.paginate({
      page: pageNum,
      limit: pageSize,
    });
  }

  @Delete('/delete')
  async delete(@Query('id') id: string) {
    return this.dictItemService.delete(
        {
          id: id,
        },
    );
  }
}
