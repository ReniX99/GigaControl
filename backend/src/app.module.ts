import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { PriorityModule } from './modules/priority/priority.module';
import { StatusesModule } from './modules/statuses/statuses.module';
import { DefectModule } from './modules/defect/defect.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    RoleModule,
    AuthModule,
    ProjectModule,
    PriorityModule,
    StatusesModule,
    DefectModule,
  ],
})
export class AppModule {}
