import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TestStatusEnum } from '../models';

export class TestCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  startDate: number;

  @IsNumber()
  endDate: number;

  @IsEnum(TestStatusEnum)
  status?: TestStatusEnum;
}
