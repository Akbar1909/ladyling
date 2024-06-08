import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {}
  async create() {}
  update() {}
  delete() {}

  async findMe(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByPhoneUsername(username: UserEntity['username']) {
    return await this.prisma.user.findFirst({ where: { username } });
  }
}
