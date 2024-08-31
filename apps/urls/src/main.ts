import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { UrlsModule } from './urls.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    UrlsModule,
    new FastifyAdapter(),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
