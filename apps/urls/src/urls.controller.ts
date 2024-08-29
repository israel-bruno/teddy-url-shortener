import { Controller, Get } from '@nestjs/common';

@Controller()
export class UrlsController {
  @Get()
  getHello() {
    return 'Hello World!';
  }
}
