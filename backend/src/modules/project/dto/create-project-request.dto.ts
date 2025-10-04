import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  description: string;
}
