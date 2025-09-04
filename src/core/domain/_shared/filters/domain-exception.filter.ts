import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseException } from '../exceptions/base-exception';

@Catch(BaseException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: BaseException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        res.status(HttpStatus.BAD_REQUEST).json({
            error: exception.name,
            message: exception.message,
            code: exception.code,
            details: exception.details ?? null,
        });
    }
}
