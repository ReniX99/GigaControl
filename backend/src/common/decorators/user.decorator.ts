import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: 'id' | 'role', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const user = request.user;

    if (!user) throw new NotFoundException();

    return data ? user[data] : user;
  },
);
