import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive, MinDate } from 'class-validator';

export class CreateTaskRequestDto {
  @IsNumber()
  @IsPositive()
  priorityId: number;

  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  deadline: Date;

  @IsNumber()
  @IsPositive()
  engineerId: number;
}
