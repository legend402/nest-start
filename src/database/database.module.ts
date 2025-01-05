import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/controllers/userController/user.service';
import { DictDto } from './entity/dict.entity';
import { DictItemDto } from './entity/dictItem.entity';
import { User } from './entity/user.entity';
import { ArticleDto } from './entity/article.entity';
import { Upload } from './entity/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hyjhyf419123',
      database: 'nestjs',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      // Nestjs 框架支持配置autoLoadEntities 这一选项，使得每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, DictDto, DictItemDto, Upload, ArticleDto]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class DatabaseModule {}
