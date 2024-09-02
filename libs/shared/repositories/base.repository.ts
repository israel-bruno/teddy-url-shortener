import { NotFoundException } from '@nestjs/common'
import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm'

export abstract class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  protected resourceName: string

  override async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const entity = await super.findOne(options)
    if (!entity) throw new NotFoundException('Resource not found', `Could not to find ${this.resourceName ?? 'any resource'}`)
    return entity
  }
}
