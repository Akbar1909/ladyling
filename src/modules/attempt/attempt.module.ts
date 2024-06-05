import { Module } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AttemptService],
  controllers: [AttemptController],
  imports: [JwtModule],
})
export class AttemptModule {}
