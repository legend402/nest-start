import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictDto } from 'src/database/entity/dict.entity';
import { DictItemDto } from 'src/database/entity/dictItem.entity';
import { DictItemService } from '../DictItemController/dictItem.service';
import { DictController } from './dict.controller';
import { DictService } from './dict.service';

@Module({
  providers: [DictService, DictItemService],
  exports: [DictService],
  controllers: [DictController],
  imports: [TypeOrmModule.forFeature([DictDto, DictItemDto])],
})
export class DictModule {}
