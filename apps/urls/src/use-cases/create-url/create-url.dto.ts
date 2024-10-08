import { ApiProperty } from '@nestjs/swagger'
import { IsUrl } from 'class-validator'

export class CreateUrlDTO {
  @ApiProperty({
    description: 'The original url',
    example: 'https://www.google.com',
    required: true,
  })
  @IsUrl()
  originalUrl: string
}
