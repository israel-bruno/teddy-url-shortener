import { ForbiddenException } from '@nestjs/common'

export const UrlErrors = {
  FORBIDDEN: new ForbiddenException('Forbidden', `You don't have permission over this url`),
} as const
