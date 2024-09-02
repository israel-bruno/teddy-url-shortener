import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from 'libs/core/pipes/validation.pipe'
import { DocsConfig } from 'libs/shared/config/docs.config'
import { UrlsModule } from './urls.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(UrlsModule, new FastifyAdapter())

  const document = SwaggerModule.createDocument(app, DocsConfig, { include: [UrlsModule] })
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalPipes(ValidationPipe)

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
