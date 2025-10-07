import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDefectRequestDto,
  CreateTaskRequestDto,
  CompleteTaskRequestDto,
} from './dto';
import { ProjectService } from '../project/project.service';
import { PriorityService } from '../priority/priority.service';
import { UserService } from '../user/user.service';
import { RoleEnum } from 'src/shared/enums';
import { StatusesService } from '../statuses/statuses.service';
import type { IDefectModel } from './interfaces';

@Injectable()
export class DefectService {
  constructor(
    private prismaService: PrismaService,
    private projectService: ProjectService,
    private priorityService: PriorityService,
    private userService: UserService,
    private statusService: StatusesService,
  ) {}

  async createDefect(
    dto: CreateDefectRequestDto,
    creatorId: number,
  ): Promise<number> {
    const { projectId, title, description, registrationDate } = dto;

    const isProjectExisted = await this.projectService.isExisted(projectId);

    if (!isProjectExisted) throw new NotFoundException('Проект не найден');

    const defect = await this.prismaService.defect.create({
      data: {
        title,
        description,
        projectId,
        creatorId,
        registrationDate,
      },
    });

    return defect.id;
  }

  async getModelById(id: number): Promise<IDefectModel | null> {
    return await this.prismaService.defect.findUnique({
      where: {
        id,
      },
      include: {
        engineer: true,
        priority: true,
        status: true,
      },
    });
  }

  async deleteDefect(defectId: number): Promise<void> {
    await this.prismaService.defect.delete({
      where: {
        id: defectId,
      },
    });
  }

  async createTask(dto: CreateTaskRequestDto, defectId: number): Promise<void> {
    const { priorityId, deadline, engineerId } = dto;

    const defect = await this.getModelById(defectId);

    if (!defect) {
      throw new NotFoundException('Дефект не найден');
    }

    const priority = await this.priorityService.getById(priorityId);
    if (!priority) throw new NotFoundException('Приоритет не найден');

    const engineer = await this.userService.getById(engineerId);

    if (!engineer) throw new NotFoundException('Инженер не найден');

    if (!engineer.userInfo?.role) {
      throw new BadRequestException('Назначенный пользователь не имеет роли');
    }

    const userRole: RoleEnum = engineer.userInfo.role.name as RoleEnum;
    if (userRole != RoleEnum.ENGINEER) {
      throw new BadRequestException('Назначенный пользователь не инженер');
    }

    if (!defect.status || defect.status.name !== 'Новая') {
      throw new BadRequestException('Необходимый статус дефекта - Новый');
    }

    const inWorkStatusId = await this.statusService.getIdByName('В работе');

    await this.prismaService.defect.update({
      where: {
        id: defectId,
      },
      data: {
        priorityId,
        deadline,
        engineerId,
        statusId: inWorkStatusId,
      },
    });
  }

  async completeTask(
    dto: CompleteTaskRequestDto,
    defectId: number,
    userId: number,
  ): Promise<void> {
    const { completionDate } = dto;

    const defect = await this.getModelById(defectId);

    if (!defect) throw new NotFoundException('Дефект не найден');

    if (userId !== defect.engineerId) {
      throw new BadRequestException(
        'Завершить задачу может только назначенный пользователь',
      );
    }

    if (defect.status.name !== 'В работе') {
      throw new BadRequestException('Необходимый статус дефекта - В работе');
    }

    const onCheckStatusId = await this.statusService.getIdByName('На проверке');

    await this.prismaService.defect.update({
      where: {
        id: defectId,
      },
      data: {
        completionDate,
        statusId: onCheckStatusId,
      },
    });
  }

  private async finishTask(
    defectId: number,
    statusId: number | undefined,
  ): Promise<void> {
    const defect = await this.getModelById(defectId);

    if (!defect) throw new NotFoundException('Дефект не найден');

    if (defect.status.name !== 'На проверке') {
      throw new BadRequestException('Необходимый статус дефекта - На проверке');
    }

    await this.prismaService.defect.update({
      where: {
        id: defectId,
      },
      data: {
        statusId,
      },
    });
  }

  async closeTask(defectId: number): Promise<void> {
    const closeStatusId = await this.statusService.getIdByName('Закрыта');
    await this.finishTask(defectId, closeStatusId);
  }

  async cancelTask(defectId: number) {
    const cancelStatusId = await this.statusService.getIdByName('Отменено');
    await this.finishTask(defectId, cancelStatusId);
  }
}
