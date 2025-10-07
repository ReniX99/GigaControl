import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DefectService } from './defect.service';
import { RoleEnum } from 'src/shared/enums';
import { Authorization, User } from 'src/common/decorators';
import {
  CompleteTaskRequestDto,
  CreateDefectRequestDto,
  CreateTaskRequestDto,
} from './dto';
import { Roles } from 'src/common/decorators';

@Controller('defects')
export class DefectController {
  constructor(private readonly defectService: DefectService) {}

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER, RoleEnum.ENGINEER)
  @Authorization()
  @Post()
  async createDefect(
    @Body() dto: CreateDefectRequestDto,
    @User('id') userId: number,
  ) {
    return await this.defectService.createDefect(dto, userId);
  }

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER)
  @Authorization()
  @Patch(':id/create-task')
  async createTask(
    @Param('id', ParseIntPipe) defectId: number,
    @Body() dto: CreateTaskRequestDto,
  ): Promise<void> {
    return await this.defectService.createTask(dto, defectId);
  }

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER)
  @Authorization()
  @Patch(':id')
  async deleteDefect(
    @Param('id', ParseIntPipe) defectId: number,
  ): Promise<void> {
    return await this.defectService.deleteDefect(defectId);
  }

  @Roles(RoleEnum.ENGINEER)
  @Authorization()
  @Patch(':id/complete-task')
  async completeTask(
    @Param('id', ParseIntPipe) defectId: number,
    @User('id') userId: number,
    @Body() dto: CompleteTaskRequestDto,
  ): Promise<void> {
    return await this.defectService.completeTask(dto, defectId, userId);
  }

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER)
  @Authorization()
  @Patch(':id/close-task')
  async closeTask(@Param('id', ParseIntPipe) defectId: number): Promise<void> {
    return await this.defectService.closeTask(defectId);
  }

  @Roles(RoleEnum.DIRECTOR, RoleEnum.MANAGER)
  @Authorization()
  @Patch(':id/cancel-task')
  async cancelTask(@Param('id', ParseIntPipe) defectId: number): Promise<void> {
    return await this.defectService.cancelTask(defectId);
  }
}
