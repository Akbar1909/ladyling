import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { TestService } from './test.service';
import { TestCreateDto } from './dto';

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
  findAll() {
    return this.testService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  deleteById(@Param('id') id: string) {
    return this.testService.deleteById(+id);
  }
}
