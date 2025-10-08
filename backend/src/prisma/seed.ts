import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const admin = {
  email: 'admin@gmail.com',
  password: '12345678',
  surname: 'Админ',
  name: 'Админ',
  roleId: 1,
};

const roles = [
  { name: 'Админ' },
  { name: 'Инженер' },
  { name: 'Менеджер' },
  { name: 'Руководитель' },
];
const statuses = [
  { name: 'Новая' },
  { name: 'В работе' },
  { name: 'На проверке' },
  { name: 'Закрыта' },
  { name: 'Отменена' },
];
const priorities = [
  { name: 'Низкий' },
  { name: 'Средний' },
  { name: 'Высокий' },
];

async function main() {
  await prisma.role.createMany({
    data: roles,
  });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(admin.password, salt);

  await prisma.user.create({
    data: {
      email: admin.email,
      password: hashPassword,
      userInfo: {
        create: {
          surname: admin.surname,
          name: admin.name,
          roleId: admin.roleId,
        },
      },
    },
  });

  await prisma.status.createMany({
    data: statuses,
  });

  await prisma.priority.createMany({
    data: priorities,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
  });
