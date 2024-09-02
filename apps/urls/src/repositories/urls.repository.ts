import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'libs/shared/repositories/base.repository'
import { Repository } from 'typeorm'
import { UrlEntity } from '../entities/url.entity'

@Injectable()
export class UrlsRepository extends BaseRepository<UrlEntity> {
  constructor(@InjectRepository(UrlEntity) readonly typeormRepository: Repository<UrlEntity>) {
    super(typeormRepository.target, typeormRepository.manager, typeormRepository.queryRunner)
  }
}
