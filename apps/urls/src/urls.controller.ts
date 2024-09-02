import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseDTO } from 'libs/core/dtos/response.dto'
import { CreateUrlDTO } from './use-cases/create-url/create-url.dto'
import { CreateUrlUseCase } from './use-cases/create-url/create-url.use-case'

@ApiTags('urls')
@Controller()
export class UrlsController {
  constructor(private readonly createUrlUseCase: CreateUrlUseCase) {}

  @Get()
  getHello() {
    return 'Hello World!'
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ example: new ResponseDTO('Url created successfully', { id: 1, originalUrl: 'https://google.com', code: 'abCAd8', link: process.env.BASE_URL + '/abCAd8' }) })
  async create(@Body() dto: CreateUrlDTO): Promise<ResponseDTO> {
    const data = await this.createUrlUseCase.execute(dto)
    return new ResponseDTO('Url created successfully', data.toModel())
  }
}
