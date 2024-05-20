import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionCreateDto } from './dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ options, ...body }: QuestionCreateDto) {
    return this.prisma.question.create({
      data: {
        ...body,
        options: {
          create: options,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany();
  }

  async findManyByTestId(testId: number) {
    return this.prisma.question.findMany({
      where: { testId },
      include: { options: true },
    });
  }

  async deleteById(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
