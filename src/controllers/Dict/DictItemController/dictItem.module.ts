import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictItemDto } from 'src/database/entity/dictItem.entity';
import { DictItemController } from './dictItem.controller';
import { DictItemService } from './dictItem.service';

@Module({
  providers: [DictItemService],
  exports: [DictItemService],
  controllers: [DictItemController],
  imports: [TypeOrmModule.forFeature([DictItemDto])],
})
export class DictItemModule {}
