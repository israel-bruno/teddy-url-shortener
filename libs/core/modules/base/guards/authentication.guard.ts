import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { RequestDTO } from '../../../dtos/request.dto'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reflector = new Reflector()

    const request = context.switchToHttp().getRequest() as RequestDTO
    const isPublicRoute = reflector.get('public', context.getHandler())

    if (isPublicRoute && !request.headers.authorization) return true

    if (!isPublicRoute && !request.headers.authorization) throw new UnauthorizedException('Unauthorized', 'Missing authorization')

    const [, token] = request.headers.authorization.split(' ')

    try {
      const payload = await this.jwtService.verify(token)
      request.payload = payload
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', error.message)
    }

    return true
  }
}
