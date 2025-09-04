import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PREFIX } from './core/domain/_shared/constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix(API_PREFIX);
  await app.listen(4000);
  console.log(`🚀 Duovera API running at http://localhost:4000/${API_PREFIX}`);
}
bootstrap();
