import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto, UserInfoResponseDto } from './dto';
import { Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(RoleEnum.ADMIN)
  @Authorization()
  @Post('create')
  async create(@Body() dto: CreateUserRequestDto) {
    return await this.userService.create(dto);
  }

  @Roles(RoleEnum.ADMIN)
  @Authorization()
  @Get()
  async getAll(): Promise<UserInfoResponseDto[]> {
    return await this.userService.getAll();
  }
}
