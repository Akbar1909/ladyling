import { Get, Controller, Param, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { AuthGuard } from '../auth/guards';
import { Public } from 'src/decorators/public.decorator';

@Controller('leaderboard')
@UseGuards(AuthGuard)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('test/:id/:userId?')
  @Public()
  findManyByTestId(@Param() query: { id: string; userId?: string }) {
    return this.leaderboardService.findManyByTestId(
      +query?.id,
      typeof query?.userId === 'string' ? +query?.userId : undefined,
    );
  }
}
