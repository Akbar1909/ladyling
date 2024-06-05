import { IsNotEmpty, IsString } from 'class-validator';

export class EnterDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
