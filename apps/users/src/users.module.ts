import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaseModule } from 'libs/core/modules/base/base.module'
import { UserEntity } from './entities/user.entity'
import { UsersRepository } from './repositories/users.repository'
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case'
import { LoginUseCase } from './use-cases/login/login.use-case'
import { UsersController } from './users.controller'

const useCases = [CreateUserUseCase, LoginUseCase]
const repositories = [UsersRepository]

@Module({
  imports: [BaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...repositories, ...useCases],
})
export class UsersModule {}
