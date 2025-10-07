import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto, StatusDto } from './dto';
import { Authentication, Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';

@Controller('statuses')
export class StatusController {
  constructor(private readonly statusesService: StatusService) {}

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
