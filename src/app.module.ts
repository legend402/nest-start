import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './logical/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserController } from './controllers/userController/user.controller';
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import { TransformInterceptor } from './logical/interceptor/transform';
import { HttpExceptionFilter } from './logical/filters/http-exception.filter';
import { AllExceptionsFilter } from './logical/filters/any-exception.filter';
import { QueryFailedExceptionFilter } from './logical/filters/typeorm-exception.filter';
import { UserModule } from './controllers/userController/user.module';
import { DictModule } from './controllers/Dict/DictController/dict.module';
import { DictItemModule } from './controllers/Dict/DictItemController/dictItem.module';
import { ArticleModule } from './controllers/Article/article.module';
import { UploadModule } from 'src/controllers/Upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenuModule } from 'src/controllers/Menu/menu.module';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./logical/auth/constants";
import { jwtAuth } from "./logical/auth/JwtAuthGuard";
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [UserController],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: jwtAuth,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    DictModule,
    DictItemModule,
    UploadModule,
    ArticleModule,
    MenuModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads'),
      serveRoot: '/uploads',
    })
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
