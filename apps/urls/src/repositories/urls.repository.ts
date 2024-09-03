import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'libs/shared/repositories/base.repository'
import { DeepPartial, Repository } from 'typeorm'
import { UrlViewEntity } from '../entities/url-views.entity'
import { UrlEntity } from '../entities/url.entity'

@Injectable()
export class UrlsRepository extends BaseRepository<UrlEntity> {
  constructor(
    @InjectRepository(UrlEntity) readonly typeormRepository: Repository<UrlEntity>,
    @InjectRepository(UrlViewEntity) private readonly urlViewsRepository: Repository<UrlViewEntity>,
  ) {
    super(typeormRepository.target, typeormRepository.manager, typeormRepository.queryRunner)
    this.resourceName = 'url'
  }

  async addView(entity: UrlEntity, view: DeepPartial<UrlViewEntity>): Promise<UrlViewEntity> {
    return await this.urlViewsRepository.save(this.urlViewsRepository.create({ urlId: entity.id, originalUrl: entity.originalUrl, ...view }))
  }
}
