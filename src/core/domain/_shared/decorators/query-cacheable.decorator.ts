import { SetMetadata } from '@nestjs/common';
export const QUERY_CACHE_KEY = 'query_cache_key';
export const QueryCacheable = (key?: string) => SetMetadata(QUERY_CACHE_KEY, key ?? true);
