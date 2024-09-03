import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaseModule } from 'libs/core/modules/base/base.module'
import { UrlViewEntity } from './entities/url-views.entity'
import { UrlEntity } from './entities/url.entity'
import { UrlsRepository } from './repositories/urls.repository'
import { UrlsController } from './urls.controller'
import { CreateUrlUseCase } from './use-cases/create-url/create-url.use-case'
import { DeleteUrlUseCase } from './use-cases/delete-urls/delete-url.use-case'
import { FindUrlUseCase } from './use-cases/find-url/find-url.use-case'
import { ListUrlsUseCase } from './use-cases/list-urls/list-urls.use-case'
import { UpdateUrlUseCase } from './use-cases/update-url/update-url.use-case'

const useCases = [CreateUrlUseCase, FindUrlUseCase, ListUrlsUseCase, DeleteUrlUseCase, UpdateUrlUseCase]
const repositories = [UrlsRepository]
@Module({
  imports: [BaseModule, TypeOrmModule.forFeature([UrlEntity, UrlViewEntity])],
  controllers: [UrlsController],
  providers: [...repositories, ...useCases],
})
export class UrlsModule {}
