import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CompleteTaskRequestDto {
  @Type(() => Date)
  @IsDate()
  completionDate: Date;
}
