import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateRoleDto): Promise<void> {
    const { name } = dto;
    await this.prismaService.role.create({
      data: { name },
    });
  }

  async getAll(): Promise<RoleDto[]> {
    return await this.prismaService.role.findMany();
  }
}
