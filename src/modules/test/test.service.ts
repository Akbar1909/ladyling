import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestCreateDto } from './dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: TestCreateDto) {
    return this.prisma.test.create({ data: body });
  }

  async findMany() {
    const tests = this.prisma.test.findMany({
      include: { _count: { select: { questions: true } } },
    });

    return tests;
  }

  async findById(id: number) {
    return this.prisma.test.findUnique({ where: { id } });
  }

  async findByIdWithQuestions(id: number) {
    return this.prisma.test.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });
  }

  async deleteById(id: number) {
    return this.prisma.test.delete({ where: { id } });
  }
}
