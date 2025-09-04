import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './core/domain/_shared/shared.module';
import { GlobalExceptionFilter } from './core/domain/_shared/filters/global-exception.filter';
import { QueryCachingInterceptor } from './core/domain/_shared/interceptors/query-caching.interceptor';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { PlatformPrismaModule } from './core/infrastructure/prisma/platform-prisma.module';
import { AppdataPrismaModule } from './core/infrastructure/prisma/appdata-prisma.module';
import { FormsModule } from './modules/forms/forms.module';

@Module({
  imports: [
    SharedModule,
    PlatformPrismaModule,
    AppdataPrismaModule,
    UsersModule,
    AuthModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: QueryCachingInterceptor },
  ],
})
export class AppModule { }
