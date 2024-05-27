import { Controller, Param, Post, Body, Get } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { FinishAttemptDto } from './dto';

@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Get('details/:id')
  findByIdWithDetails(@Param('id') id: string) {
    return this.attemptService.findByIdWithDetails(+id);
  }

  @Post('start/:testId')
  create(@Param('testId') testId: number) {
    return this.attemptService.create(+testId, 1);
  }

  @Post('finish')
  finish(@Body() body: FinishAttemptDto) {
    return this.attemptService.finish(body);
  }
}
