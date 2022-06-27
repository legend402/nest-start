import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './controllers/appController/app.controller';
import { AppService } from './controllers/appController/app.service';
import { AuthModule } from './logical/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserController } from './controllers/userController/user.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './logical/interceptor/transform';
import { HttpExceptionFilter } from './logical/filters/http-exception.filter';
import { AllExceptionsFilter } from './logical/filters/any-exception.filter';
import { QueryFailedExceptionFilter } from './logical/filters/typeorm-exception.filter';
import { UserModule } from './controllers/userController/user.module';

@Module({
  controllers: [AppController, UserController],
  providers: [
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
    AppService,
  ],
  imports: [UserModule, AuthModule, DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
