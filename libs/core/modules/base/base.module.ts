import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeormConfig } from 'libs/shared/infra/typeorm/orm.config'
import { HealthCheckModule } from '../health-check/health-check.module'
import { AuthGuard } from './guards/authentication.guard'

@Module({
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
  imports: [HealthCheckModule, TypeOrmModule.forRoot(TypeormConfig), JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: process.env.JWT_EXPIRES_IN } })],
})
export class BaseModule {}
