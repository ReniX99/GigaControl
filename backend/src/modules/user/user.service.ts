import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequestDto } from './dto';
import * as bcrypt from 'bcrypt';
import { IUserInfo } from './interfaces';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserRequestDto): Promise<void> {
    const { email, name, password, roleId, surname } = dto;

    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await this.prismaService.user.create({
      data: {
        email,
        password: hashPassword,
        userInfo: {
          create: {
            surname,
            name,
            roleId,
          },
        },
      },
    });
  }

  async getByEmail(email: string): Promise<IUserInfo | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        userInfo: {
          select: {
            surname: true,
            name: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
