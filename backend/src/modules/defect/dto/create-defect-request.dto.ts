import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDefectRequestDto {
  @IsNumber()
  @IsPositive()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  registrationDate: Date;
}
