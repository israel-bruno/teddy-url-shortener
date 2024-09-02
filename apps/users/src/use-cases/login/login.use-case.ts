import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PayloadDTO } from 'libs/core/dtos/payload.dto'
import { IUseCase } from 'libs/shared/interfaces/use-case.interface'
import { UsersRepository } from '../../repositories/users.repository'
import { LoginResponseDTO } from './login-response.dto'
import { LoginDTO } from './login.dto'

@Injectable()
export class LoginUseCase implements IUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } })

    if (!user) throw new UnauthorizedException('Unauthorized', 'Invalid email or password')

    const passwordMatch = bcrypt.compareSync(dto.password, user.password)
    if (!passwordMatch) throw new UnauthorizedException('Unauthorized', 'Invalid email or password')

    const token = this.jwtService.sign(new PayloadDTO(user.id).toPlainObject())

    return new LoginResponseDTO(token)
  }
}
