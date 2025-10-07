import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStatusDto, StatusDto } from './dto';
import { Status } from 'generated/prisma';

@Injectable()
export class StatusesService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateStatusDto): Promise<void> {
    const { name } = dto;

    await this.prismaService.status.create({
      data: {
        name,
      },
    });
  }

  async getById(id: number): Promise<Status | null> {
    return await this.prismaService.status.findUnique({
      where: {
        id,
      },
    });
  }

  async getIdByName(name: string): Promise<number | undefined> {
    const status = await this.prismaService.status.findFirst({
      where: {
        name,
      },
    });

    return status?.id;
  }

  async getAll(): Promise<StatusDto[]> {
    return await this.prismaService.status.findMany();
  }
}
