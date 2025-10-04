import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectRequest, ProjectInfoResponseDto } from './dto';

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
}
