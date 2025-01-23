import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  EntityNotFoundError,
  QueryFailedError,
  MustBeEntityError,
} from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError, MustBeEntityError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { url } = request;
    const { name } = exception;

    response.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Service Error: ${name}`,
      path: url,
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
}
