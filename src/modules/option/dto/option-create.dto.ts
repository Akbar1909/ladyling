import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class OptionCreateDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}
