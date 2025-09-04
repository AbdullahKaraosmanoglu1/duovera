import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { QUERY_CACHE_KEY } from '../decorators/query-cacheable.decorator';

const memCache = new Map<string, any>();

@Injectable()
export class QueryCachingInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isCacheable = this.reflector.get(QUERY_CACHE_KEY, context.getHandler());
        if (!isCacheable) return next.handle();
        const req = context.switchToHttp().getRequest();
        const key = `GET:${req.originalUrl}`;
        const cached = memCache.get(key);
        if (cached) return of(cached);
        return next.handle().pipe(tap((data) => memCache.set(key, data)));
    }
}
