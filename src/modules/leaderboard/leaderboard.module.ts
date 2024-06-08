import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
  imports: [JwtModule],
})
export class LeaderBoardModule {}
