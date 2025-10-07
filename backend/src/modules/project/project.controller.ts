import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateProjectRequest,
  ProjectDto,
  ProjectInfoResponseDto,
} from './dto';
import { Authorization, Roles } from 'src/common/decorators';
import { RoleEnum } from 'src/shared/enums';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Roles(RoleEnum.DIRECTOR)
  @Authorization()
  @Post()
  async create(@Body() dto: CreateProjectRequest) {
    return await this.projectService.create(dto);
  }

  @Roles(RoleEnum.ENGINEER, RoleEnum.MANAGER, RoleEnum.DIRECTOR)
  @Authorization()
  @Get()
  async getAll(): Promise<ProjectInfoResponseDto[]> {
    return await this.projectService.getAll();
  }

  @Roles(RoleEnum.ENGINEER, RoleEnum.MANAGER, RoleEnum.DIRECTOR)
  @Authorization()
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) projectId: string,
  ): Promise<ProjectDto> {
    return await this.projectService.getById(+projectId);
  }
}
