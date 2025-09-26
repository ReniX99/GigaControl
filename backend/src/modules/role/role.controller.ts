import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';
import { Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(RoleEnum.ADMIN)
  @Authorization()
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }
}
