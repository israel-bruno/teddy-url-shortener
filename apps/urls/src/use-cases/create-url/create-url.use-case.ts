import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import * as RandExp from 'randexp'
import { UrlEntity } from '../../entities/url.entity'
import { UrlsRepository } from '../../repositories/urls.repository'
import { CreateUrlDTO } from './create-url.dto'

@Injectable()
export class CreateUrlUseCase implements IUseCase {
  constructor(private readonly urlsRepository: UrlsRepository) {}

  async execute(dto: CreateUrlDTO): Promise<UrlEntity> {
    return await this.urlsRepository.save(this.urlsRepository.create({ ...dto, code: await this.generateUniqueRandomCode() }))
  }

  private async generateUniqueRandomCode() {
    const retries = 10

    for (let i = 0; i < retries; i++) {
      const code = new RandExp(/^[a-zA-Z0-9]{6}$/).gen()
      const codeAlreadyExists = await this.urlsRepository.findOneBy({ code })
      if (!codeAlreadyExists) return code
    }

    throw new InternalServerErrorException('Internal server errors', 'It was not possible to generate a code for the provided URL')
  }
}
