import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import { DictItemDto } from 'src/database/entity/dictItem.entity';
import { DictItemService } from './dictItem.service';

@Controller('dictItem')
export class DictItemController {
  constructor(private readonly dictItemService: DictItemService) {}

  @Public()
  @Post('add')
  async addOne(@Body() dictItem: DictItemDto) {
    return this.dictItemService.saveOne(dictItem);
  }
}
