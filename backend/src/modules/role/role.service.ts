import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateRoleDto): Promise<void> {
    const { name } = dto;
    await this.prismaService.role.create({
      data: { name },
    });
  }
}
