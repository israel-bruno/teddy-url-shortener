import { Module } from '@nestjs/common';
import { BaseModule } from 'libs/core/modules/base/base.module';
import { UrlsController } from './urls.controller';

@Module({
  imports: [BaseModule],
  controllers: [UrlsController],
})
export class UrlsModule {}
