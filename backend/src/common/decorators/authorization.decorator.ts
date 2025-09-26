import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { RolesGuard } from '../guards/roles.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard));
}
