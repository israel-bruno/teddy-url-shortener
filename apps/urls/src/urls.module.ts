import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaseModule } from 'libs/core/modules/base/base.module'
import { UrlEntity } from './entities/url.entity'
import { UrlsRepository } from './repositories/urls.repository'
import { UrlsController } from './urls.controller'
import { CreateUrlUseCase } from './use-cases/create-url/create-url.use-case'

const useCases = [CreateUrlUseCase]
const repositories = [UrlsRepository]
@Module({
  imports: [BaseModule, TypeOrmModule.forFeature([UrlEntity])],
  controllers: [UrlsController],
  providers: [...repositories, ...useCases],
})
export class UrlsModule {}
