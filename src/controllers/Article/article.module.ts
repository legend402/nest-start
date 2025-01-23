import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleDto } from 'src/database/entity/article.entity';
import {UserService} from "../userController/user.service";
import {User} from "../../database/entity/user.entity";

@Module({
  providers: [ArticleService, UserService],
  exports: [ArticleService],
  controllers: [ArticleController],
  imports: [TypeOrmModule.forFeature([ArticleDto, User])],
})
export class ArticleModule {}
