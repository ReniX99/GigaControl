import { Module } from '@nestjs/common';
import { DefectService } from './defect.service';
import { DefectController } from './defect.controller';
import { ProjectModule } from '../project/project.module';
import { PriorityModule } from '../priority/priority.module';
import { StatusModule } from '../status/status.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [DefectController],
  providers: [DefectService],
  imports: [ProjectModule, PriorityModule, StatusModule, UserModule],
})
export class DefectModule {}
