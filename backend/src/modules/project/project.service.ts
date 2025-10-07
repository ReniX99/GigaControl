import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProjectRequest,
  ProjectDto,
  ProjectInfoResponseDto,
} from './dto';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProjectRequest): Promise<number> {
    const { title, description } = dto;

    const project = await this.prismaService.project.create({
      data: {
        title,
        description,
      },
    });

    return project.id;
  }

  async getAll(): Promise<ProjectInfoResponseDto[]> {
    const projects = await this.prismaService.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        _count: {
          select: {
            defects: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      defectsCount: p._count.defects,
    }));
  }

  async isExisted(id: number): Promise<boolean> {
    const project = await this.prismaService.project.findUnique({
      where: {
        id,
      },
    });

    return project !== null;
  }

  async getById(id: number): Promise<ProjectDto> {
    const project = await this.prismaService.project.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        description: true,
        defects: {
          select: {
            id: true,
            title: true,
            description: true,
            priority: {
              select: {
                name: true,
              },
            },
            status: {
              select: {
                name: true,
              },
            },
            registrationDate: true,
            deadline: true,
            completionDate: true,
            engineer: {
              select: {
                surname: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!project) throw new NotFoundException('Проект не найден');

    return {
      title: project.title,
      description: project.description,
      defects: project.defects.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        priority: d.priority?.name,
        status: d.status.name,
        registrationDate: d.registrationDate.toISOString(),
        deadline: d.deadline?.toISOString(),
        completionDate: d.completionDate?.toISOString(),
        engineer: d.engineer
          ? {
              surname: d.engineer.surname,
              name: d.engineer.name,
            }
          : undefined,
      })),
    };
  }
}
