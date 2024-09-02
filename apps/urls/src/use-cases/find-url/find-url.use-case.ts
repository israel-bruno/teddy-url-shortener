import { Injectable } from '@nestjs/common'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UrlEntity } from '../../entities/url.entity'
import { UrlsRepository } from '../../repositories/urls.repository'

@Injectable()
export class FindUrlUseCase implements IUseCase {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async execute(code: string): Promise<UrlEntity> {
    return await this.urlsRepository.findOneOrFail({ where: { code } })
  }
}
