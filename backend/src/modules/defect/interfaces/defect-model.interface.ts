import { Defect, Priority, Status, UserInfo } from 'generated/prisma';

export interface IDefectModel extends Defect {
  priority: Priority | null;

  status: Status;

  engineer: UserInfo | null;
}
