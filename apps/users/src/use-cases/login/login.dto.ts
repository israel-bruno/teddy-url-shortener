import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class LoginDTO {
  @ApiProperty({
    description: 'The user email',
    example: 'john.doe@example.com',
    maxLength: 100,
    required: true,
  })
  @IsEmail()
  @Length(0, 100)
  email: string

  @ApiProperty({
    description: 'The user password',
    example: 'fakePassword123',
    minLength: 8,
    maxLength: 30,
    required: true,
  })
  @IsString()
  @Length(8, 30)
  password: string
}
