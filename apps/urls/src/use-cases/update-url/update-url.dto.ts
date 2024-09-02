import { ApiProperty } from '@nestjs/swagger'
import { IsUrl } from 'class-validator'

export class UpdateUrlDTO {
  @ApiProperty({
    description: 'The new origin',
    example: 'https://docs.nestjs.com/',
    required: true,
  })
  @IsUrl()
  originalUrl: string
}
