import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleDto } from 'src/database/entity/article.entity';

@Module({
  providers: [ArticleService],
  exports: [ArticleService],
  controllers: [ArticleController],
  imports: [TypeOrmModule.forFeature([ArticleDto])],
})
export class ArticleModule {}
