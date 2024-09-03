import { Injectable } from '@nestjs/common'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UrlEntity } from '../../entities/url.entity'
import { UrlsRepository } from '../../repositories/urls.repository'
import { FindUrlDTO } from './find-url.dto'

@Injectable()
export class FindUrlUseCase implements IUseCase {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async execute(code: string, dto: FindUrlDTO): Promise<UrlEntity> {
    const url = await this.urlsRepository.findOneOrFail({ where: { code } })

    const savedView = await this.urlsRepository.addView(url, dto)

    return url
  }
}
