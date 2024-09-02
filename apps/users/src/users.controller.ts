import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResponseDTO } from 'libs/core/dtos/response.dto'
import { CreateUserDTO } from './use-cases/create-user/create-user.dto'
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case'

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<ResponseDTO> {
    const user = await this.createUserUseCase.execute(dto)
    return new ResponseDTO('User created sucessfully', user.toModel())
  }
}
