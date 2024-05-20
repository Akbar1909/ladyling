import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestCreateDto } from './dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: TestCreateDto) {
    return this.prisma.test.create({ data: body });
  }

  async findAll() {
    return this.prisma.test.findMany();
  }

  async deleteById(id: number) {
    return this.prisma.test.delete({ where: { id } });
  }
}
