import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequestDto, EngineerDto, UserInfoResponseDto } from './dto';
import * as bcrypt from 'bcrypt';
import { IUserInfo, IUserRole } from './interfaces';

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

  async getById(id: number): Promise<IUserRole | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userInfo: {
          include: {
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

  async getAll(): Promise<UserInfoResponseDto[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        userInfo: {
          role: {
            NOT: {
              name: 'Админ',
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
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
      orderBy: [
        {
          userInfo: {
            role: {
              name: 'asc',
            },
          },
        },
        {
          userInfo: {
            surname: 'asc',
          },
        },
        {
          userInfo: {
            name: 'asc',
          },
        },
      ],
    });

    return users.map((u) => ({
      id: u.id,
      email: u.email,
      surname: u.userInfo!.surname,
      name: u.userInfo!.name,
      role: u.userInfo!.role?.name,
    }));
  }

  async getEngineers(): Promise<EngineerDto[]> {
    const engineers = await this.prismaService.userInfo.findMany({
      where: {
        role: {
          name: 'Инженер',
        },
      },
      select: {
        userId: true,
        surname: true,
        name: true,
      },
      orderBy: {
        surname: 'asc',
      },
    });

    return engineers.map((e) => ({
      id: e.userId,
      surname: e.surname,
      name: e.name,
    }));
  }
}
