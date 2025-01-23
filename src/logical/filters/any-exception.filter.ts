import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TokenExpiredError } from "jsonwebtoken";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception)
    const status = getStatus(exception);
    response.status(status).json({
      code: status,
      message: getMessage(exception),
      path: request.url,
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
}


function getStatus(exception) {
  if (exception instanceof HttpException) {
    return exception.getStatus();
  } else if (exception instanceof TokenExpiredError) {
    return HttpStatus.UNAUTHORIZED;
  } else {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
function getMessage(exception) {
   if (exception instanceof TokenExpiredError) {
    return "Token已过期, 请重新登录";
  } else {
    return `Service Error: ${exception}`;
  }
}
