import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectRequest, ProjectInfoResponseDto } from './dto';
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
}
