import { NestFactory } from '@nestjs/core';
import { UrlsModule } from './urls.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlsModule);
  await app.listen(3000);
}
bootstrap();
