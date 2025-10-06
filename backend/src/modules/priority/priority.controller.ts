import { Body, Controller, Get, Post } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto, PriorityDto } from './dto';
import { Authentication, Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';

@Controller('priorities')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER)
  @Authorization()
  @Post()
  async create(@Body() dto: CreatePriorityDto): Promise<void> {
    return await this.priorityService.create(dto);
  }

  @Authentication()
  @Get()
  async getAll(): Promise<PriorityDto[]> {
    return await this.priorityService.getAll();
  }
}
