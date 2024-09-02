import { Injectable } from '@nestjs/common'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UrlErrors } from '../../helpers/errors.enum.helper'
import { UrlsRepository } from '../../repositories/urls.repository'

@Injectable()
export class DeleteUrlUseCase implements IUseCase {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async execute(code: string, actorId: number): Promise<void> {
    const url = await this.urlsRepository.findOneOrFail({ where: { code } })

    if (url.ownerId !== actorId) throw UrlErrors.FORBIDDEN

    await this.urlsRepository.softRemove(url)
  }
}
