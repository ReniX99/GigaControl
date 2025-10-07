import { DefectDto } from 'src/modules/defect/dto';

export class ProjectDto {
  title: string;

  description: string;

  defects: DefectDto[];
}
