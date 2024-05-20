import { IsNotEmpty, IsString } from 'class-validator';

export class TestCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
