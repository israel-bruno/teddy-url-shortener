import { Controller, Get } from '@nestjs/common'
import { Public } from 'libs/core/decorators/public.decorator'

@Controller('/health-check')
export class HealthCheckController {
  @Get()
  @Public()
  healthCheck() {
    return 'Healthy!'
  }
}
