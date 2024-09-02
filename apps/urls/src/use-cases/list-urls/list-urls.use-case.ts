import { Injectable } from '@nestjs/common'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UrlEntity } from '../../entities/url.entity'
import { UrlsRepository } from '../../repositories/urls.repository'

@Injectable()
export class ListUrlsUseCase implements IUseCase {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async execute(ownerId: number): Promise<UrlEntity[]> {
    return await this.urlsRepository.find({ where: { ownerId } })
  }
}
