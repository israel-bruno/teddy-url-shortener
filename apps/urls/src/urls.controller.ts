import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Redirect, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiPermanentRedirectResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'libs/core/decorators/public.decorator'
import { RequestDTO } from 'libs/core/dtos/request.dto'
import { ResponseDTO } from 'libs/core/dtos/response.dto'
import { UrlEntity } from './entities/url.entity'
import { CreateUrlDTO } from './use-cases/create-url/create-url.dto'
import { CreateUrlUseCase } from './use-cases/create-url/create-url.use-case'
import { DeleteUrlUseCase } from './use-cases/delete-urls/delete-url.use-case'
import { FindUrlUseCase } from './use-cases/find-url/find-url.use-case'
import { ListUrlsUseCase } from './use-cases/list-urls/list-urls.use-case'
import { UpdateUrlUseCase } from './use-cases/update-url/update-url.use-case'

@ApiTags('urls')
@Controller()
export class UrlsController {
  constructor(
    private readonly createUrlUseCase: CreateUrlUseCase,
    private readonly findUrlUseCase: FindUrlUseCase,
    private readonly listUrlsUseCase: ListUrlsUseCase,
    private readonly deleteUrlUseCase: DeleteUrlUseCase,
    private readonly updateUrlUseCase: UpdateUrlUseCase,
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
  @ApiResponse({ example: new ResponseDTO('Url created successfully', UrlEntity.example()) })
  async create(@Body() dto: CreateUrlDTO, @Req() req: RequestDTO): Promise<ResponseDTO> {
    const data = await this.createUrlUseCase.execute(dto, req.payload?.id)

    return new ResponseDTO('Url created successfully', data.toModel())
  }

  @Patch('/:code')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Shrink a url' })
  @ApiResponse({ example: new ResponseDTO('Url created successfully', UrlEntity.example()) })
  async update(@Param('code') code: string, @Body() dto: CreateUrlDTO, @Req() req: RequestDTO): Promise<ResponseDTO> {
    const data = await this.updateUrlUseCase.execute(code, dto, req.payload.id)

    return new ResponseDTO('Url created successfully', data.toModel())
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve urls list' })
  @ApiResponse({ example: new ResponseDTO('Urls retrieved successfully', [UrlEntity.example()]) })
  async find(@Req() req: RequestDTO): Promise<ResponseDTO> {
    const urls = await this.listUrlsUseCase.execute(req.payload.id)

    return new ResponseDTO(
      'Urls retrieved successfully',
      urls.map((url) => url.toModel()),
    )
  }

  @Delete('/:code')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete url' })
  @ApiResponse({ example: new ResponseDTO('Urls retrieved successfully', [UrlEntity.example()]) })
  async delete(@Param('code') code: string, @Req() req: RequestDTO): Promise<ResponseDTO> {
    await this.deleteUrlUseCase.execute(code, req.payload.id)

    return new ResponseDTO('Url deleted successfully')
  }
}
