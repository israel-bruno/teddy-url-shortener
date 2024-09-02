import { BadRequestException, Injectable } from '@nestjs/common'
import { encryptPassword } from 'libs/core/helpers/encypt-password.helper'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UserEntity } from '../../entities/user.entity'
import { UsersRepository } from '../../repositories/users.repository'
import { CreateUserDTO } from './create-user.dto'

@Injectable()
export class CreateUserUseCase implements IUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: CreateUserDTO): Promise<UserEntity> {
    await this.assertEmailIsUnique(dto.email)
    return await this.usersRepository.save(this.usersRepository.create({ ...dto, password: await encryptPassword(dto.password) }))
  }

  private async assertEmailIsUnique(email: string) {
    const user = await this.usersRepository.findOneBy({ email })
    if (user) throw new BadRequestException('Bad request', 'Email already taken')
  }
}
