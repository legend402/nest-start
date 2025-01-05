import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log(request.url, '正常接口请求');

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: 200,
        message: '请求成功',
        success: true,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
