import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

export function Authentication() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
