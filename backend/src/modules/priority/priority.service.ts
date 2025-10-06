import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePriorityDto, PriorityDto } from './dto';
import { Priority } from 'generated/prisma';

@Injectable()
export class PriorityService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreatePriorityDto): Promise<void> {
    const { name } = dto;
    await this.prismaService.priority.create({
      data: {
        name,
      },
    });
  }

  async getById(id: number): Promise<Priority | null> {
    return await this.prismaService.priority.findUnique({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<PriorityDto[]> {
    return await this.prismaService.priority.findMany();
  }
}
