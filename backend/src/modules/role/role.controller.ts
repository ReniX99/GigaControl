import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }
}
