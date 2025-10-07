import { Module } from '@nestjs/common';
import { DefectService } from './defect.service';
import { DefectController } from './defect.controller';
import { ProjectModule } from '../project/project.module';
import { PriorityModule } from '../priority/priority.module';
import { StatusesModule } from '../statuses/statuses.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [DefectController],
  providers: [DefectService],
  imports: [ProjectModule, PriorityModule, StatusesModule, UserModule],
})
export class DefectModule {}
