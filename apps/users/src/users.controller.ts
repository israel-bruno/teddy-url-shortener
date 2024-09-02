import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'libs/core/decorators/public.decorator'
import { ResponseDTO } from 'libs/core/dtos/response.dto'
import { CreateUserDTO } from './use-cases/create-user/create-user.dto'
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case'
import { LoginDTO } from './use-cases/login/login.dto'
import { LoginUseCase } from './use-cases/login/login.use-case'

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Sign in' })
  @Public()
  async login(@Body() dto: LoginDTO): Promise<ResponseDTO> {
    const data = await this.loginUseCase.execute(dto)
    return new ResponseDTO('Logged in sucessfully', data)
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() dto: CreateUserDTO): Promise<ResponseDTO> {
    const user = await this.createUserUseCase.execute(dto)
    return new ResponseDTO('User created sucessfully', user.toModel())
  }
}
