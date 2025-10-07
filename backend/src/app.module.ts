import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { PriorityModule } from './modules/priority/priority.module';
import { StatusModule } from './modules/status/status.module';
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
    StatusModule,
    DefectModule,
  ],
})
export class AppModule {}
