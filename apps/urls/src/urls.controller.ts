import { Body, Controller, Get, HttpStatus, Param, Post, Redirect } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiPermanentRedirectResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'libs/core/decorators/public.decorator'
import { ResponseDTO } from 'libs/core/dtos/response.dto'
import { CreateUrlDTO } from './use-cases/create-url/create-url.dto'
import { CreateUrlUseCase } from './use-cases/create-url/create-url.use-case'
import { FindUrlUseCase } from './use-cases/find-url/find-url.use-case'

@ApiTags('urls')
@Controller()
export class UrlsController {
  constructor(
    private readonly createUrlUseCase: CreateUrlUseCase,
    private readonly findUrlUseCase: FindUrlUseCase,
  ) {}

  @Get('/:code')
  @Public()
  @Redirect()
  @ApiOperation({ summary: 'Redirect to origin url' })
  @ApiPermanentRedirectResponse({ status: HttpStatus.PERMANENT_REDIRECT })
  async getRedirect(@Param('code') code: string) {
    const url = await this.findUrlUseCase.execute(code)
    return { url: url.originalUrl, statusCode: HttpStatus.PERMANENT_REDIRECT }
  }

  @Post()
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Shrink a url' })
  @ApiResponse({ example: new ResponseDTO('Url created successfully', { id: 1, originalUrl: 'https://www.google.com', code: 'abCAd8', link: process.env.BASE_URL + '/abCAd8' }) })
  async create(@Body() dto: CreateUrlDTO): Promise<ResponseDTO> {
    const data = await this.createUrlUseCase.execute(dto)
    return new ResponseDTO('Url created successfully', data.toModel())
  }
}
