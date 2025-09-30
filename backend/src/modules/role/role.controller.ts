import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';
import { Authentication, Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(RoleEnum.ADMIN)
  @Authorization()
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }

  @Authentication()
  @Get()
  async getAll(): Promise<RoleDto[]> {
    return await this.roleService.getAll();
  }
}
