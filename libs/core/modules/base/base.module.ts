import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from 'libs/shared/infra/typeorm/orm.config';
import { HealthCheckModule } from '../health-check/health-check.module';

@Module({
  imports: [HealthCheckModule, TypeOrmModule.forRoot(TypeormConfig)],
})
export class BaseModule {}
