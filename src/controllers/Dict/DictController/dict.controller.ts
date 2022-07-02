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
import { DictDto } from 'src/database/entity/dict.entity';
import { DictItemService } from '../DictItemController/dictItem.service';
import { DictListType } from './dict.interface';
import { DictService } from './dict.service';

@Controller('dict')
export class DictController {
  constructor(
    private readonly dictService: DictService,
    private readonly dictItemService: DictItemService,
  ) {}

  @Public()
  @Get('/list')
  async findALl(@Param() param: DictListType) {
    const { pageSize = 10, pageNum = 0 } = param;
    return this.dictService.findMany({
      take: pageSize,
      skip: pageNum,
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
  @Get('getDictByCode/:dictCode')
  async getDictItem(@Param() { dictCode }) {
    const dict = await this.dictService.findOne({
      where: {
        dictCode,
      },
    });
    if (!dict) return [];
    return this.dictItemService.findMany({
      where: {
        pid: dict.pid,
      },
    });
  }

  @Delete('/delete')
  async delete(@Body() dict: DictDto) {
    // return this.dictService.delete(
    //   {
    //     id: dict.id,
    //   },
    //   dict,
    // );
  }
}
