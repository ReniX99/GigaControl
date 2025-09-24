import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() dto: CreateUserRequestDto) {
    return await this.userService.create(dto);
  }
}
