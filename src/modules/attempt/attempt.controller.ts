import { Controller, Param, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { FinishAttemptDto } from './dto';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from '../auth/guards';
import { Public } from 'src/decorators/public.decorator';

@Controller('attempt')
@UseGuards(AuthGuard)
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Get('details/:id')
  @Public()
  findByIdWithDetails(@Param('id') id: string) {
    console.log({ id });
    return this.attemptService.findByIdWithDetails(+id);
  }

  @Post('start/:testId')
  create(@Param('testId') testId: number, @User() user: any) {
    return this.attemptService.create(+testId, user?.sub as number);
  }

  @Post('finish')
  finish(@Body() body: FinishAttemptDto) {
    return this.attemptService.finish(body);
  }
}
