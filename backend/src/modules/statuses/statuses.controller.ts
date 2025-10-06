import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto, StatusDto } from './dto';
import { Authentication, Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER)
  @Authorization()
  @Post()
  async create(@Body() dto: CreateStatusDto): Promise<void> {
    return await this.statusesService.create(dto);
  }

  @Authentication()
  @Get()
  async getAll(): Promise<StatusDto[]> {
    return await this.statusesService.getAll();
  }
}
