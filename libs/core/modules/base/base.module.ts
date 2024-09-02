import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeormConfig } from 'libs/shared/infra/typeorm/orm.config'
import { HealthCheckModule } from '../health-check/health-check.module'

@Module({
  imports: [HealthCheckModule, TypeOrmModule.forRoot(TypeormConfig), JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: process.env.JWT_EXPIRES_IN } })],
})
export class BaseModule {}
