import { Injectable } from '@nestjs/common'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UrlEntity } from '../../entities/url.entity'
import { UrlErrors } from '../../helpers/errors.enum.helper'
import { UrlsRepository } from '../../repositories/urls.repository'
import { UpdateUrlDTO } from './update-url.dto'

@Injectable()
export class UpdateUrlUseCase implements IUseCase {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async execute(code: string, dto: UpdateUrlDTO, actorId: number): Promise<UrlEntity> {
    const url = await this.urlsRepository.findOneOrFail({ where: { code } })

    if (url.ownerId !== actorId) throw UrlErrors.FORBIDDEN

    const updated = await this.urlsRepository.save({ ...dto, id: url.id })

    return Object.assign(url, updated)
  }
}
