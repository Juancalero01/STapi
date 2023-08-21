import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const options = exception.getResponse();

    response.status(status).json({
      httpMethod: request.method,
      httpStatus: status,
      exceptionName: exception.name,
      errorMessage: exception.message,
      validationErrors:
        typeof options === 'object' && options.hasOwnProperty('message')
          ? options['message']
          : 'Without validation errors',
    });
  }
}
