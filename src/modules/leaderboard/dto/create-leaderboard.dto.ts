import { IsNumber } from 'class-validator';

export class CreateLeaderboardDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  testId: number;

  @IsNumber()
  score: number;

  @IsNumber()
  spendedTime: number;
}
