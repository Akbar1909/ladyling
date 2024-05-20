import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { QuestionCreateDto } from './dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() body: QuestionCreateDto) {
    return this.questionService.create(body);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('test/:testId')
  findManyByTestId(@Param('testId') testId: string) {
    return this.questionService.findManyByTestId(+testId);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.questionService.deleteById(+id);
  }
}
