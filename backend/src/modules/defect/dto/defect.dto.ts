import { UserPersonalDataDto } from 'src/modules/user/dto';

export class DefectDto {
  id: number;

  title: string;

  description: string;

  priority?: string;

  status?: string;

  registrationDate: string;

  deadline?: string;

  completionDate?: string;

  engineer?: UserPersonalDataDto;
}
