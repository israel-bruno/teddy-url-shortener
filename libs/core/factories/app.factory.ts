import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule } from '@nestjs/swagger'
import { DocsConfig } from 'libs/shared/config/docs.config'
import { ValidationPipe } from '../pipes/validation.pipe'

export class AppFactory {
  static async create(module: any): Promise<NestFastifyApplication> {
    const app = await NestFactory.create<NestFastifyApplication>(module, new FastifyAdapter())

    const document = SwaggerModule.createDocument(app, DocsConfig, { include: [module] })
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(ValidationPipe)

    return app
  }
}
