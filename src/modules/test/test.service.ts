import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestCreateDto } from './dto';
import { TestStatusEnum } from './models';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: TestCreateDto) {
    return this.prisma.test.create({ data: body });
  }

  async findMany() {
    const tests = this.prisma.test.findMany({
      include: { _count: { select: { questions: true, attempts: true } } },
    });

    return tests;
  }

  async findById(id: number) {
    return this.prisma.test.findUnique({ where: { id } });
  }

  async updateStatus(id: number, status: TestStatusEnum) {
    const updatedRecord = await this.prisma.test.update({
      where: { id },
      data: { status },
    });

    return updatedRecord;
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
