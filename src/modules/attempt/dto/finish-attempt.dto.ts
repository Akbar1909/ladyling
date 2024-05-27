import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

class SelectedOptionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  selectedId: number;
}

export class FinishAttemptDto {
  @IsNumber()
  attemptId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectedOptionDto)
  questions: SelectedOptionDto[];
}
