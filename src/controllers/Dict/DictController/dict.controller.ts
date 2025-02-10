import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
} from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import { DictDto } from 'src/database/entity/dict.entity';
import { DictItemService } from '../DictItemController/dictItem.service';
import { DictListType } from './dict.interface';
import { DictService } from './dict.service';
import {PageType} from "../../../types/common";

interface ListSearch extends PageType {
  dictCode: string;
  status: 1 | 0;
}

@Controller('dict')
export class DictController {
  constructor(
    private readonly dictService: DictService,
    private readonly dictItemService: DictItemService,
  ) {}

  @Public()
  @Get('/list')
  async getAll(@Query() param: ListSearch) {
    const { pageSize = 10, pageNum = 1, dictCode } = param;
    return this.dictService.paginate({
      page: pageNum,
      limit: pageSize,
    }, {
      where: {
        dictCode: dictCode,
      }
    });
  }

  @Public()
  @Post('/add')
  async addOne(@Body() dict: DictDto) {
    return this.dictService.saveOne(dict);
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

  @Public()
  @Get('getDictByCode')
  async getDictItem(@Query() params: ListSearch) {
    const { pageSize = 10, pageNum = 1, dictCode, status } = params;
    const dict = await this.dictService.findOne({
      where: {
        dictCode,
      },
    });
    if (!dict) return [];
    return this.dictItemService.paginate({
      limit: pageSize,
      page: pageNum,
    }, {
      order: {
        sort: 'ASC'
      },
      where: {
        pid: dict.id,
        status: status,
      },
    });
  }

  @Delete('/delete')
  async delete(@Query('id') id: string) {
    return this.dictService.delete(
      {
        id: id,
      },
    );
  }
}
