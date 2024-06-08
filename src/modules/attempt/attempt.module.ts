import { Module } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import { JwtModule } from '@nestjs/jwt';
import { LeaderBoardModule } from '../leaderboard/leaderboard.module';

@Module({
  providers: [AttemptService],
  controllers: [AttemptController],
  imports: [JwtModule, LeaderBoardModule],
})
export class AttemptModule {}
