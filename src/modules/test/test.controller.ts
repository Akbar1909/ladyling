import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { TestService } from './test.service';
import { TestCreateDto } from './dto';
import { TestStatusEnum } from './models';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() body: TestCreateDto) {
    return this.testService.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findMany() {
    return this.testService.findMany();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.testService.findById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: TestStatusEnum },
  ) {
    return this.testService.updateStatus(+id, body.status);
  }

  @HttpCode(HttpStatus.OK)
  @Get('questions/:id')
  findByIdWithQuestions(@Param('id') id: string) {
    return this.testService.findByIdWithQuestions(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.testService.deleteById(+id);
  }
}
