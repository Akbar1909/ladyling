import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OptionCreateDto } from 'src/modules/option/dto';

export class QuestionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  testId: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  imageUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionCreateDto)
  options: OptionCreateDto[];
}
