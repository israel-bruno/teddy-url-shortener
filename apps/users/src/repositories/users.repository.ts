import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseRepository } from 'libs/shared/repositories/base.repository'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) readonly typeormRepository: Repository<UserEntity>) {
    super(typeormRepository.target, typeormRepository.manager, typeormRepository.queryRunner)
    this.resourceName = 'user'
  }
}
