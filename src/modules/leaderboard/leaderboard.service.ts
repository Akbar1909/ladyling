import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeaderboardDto } from './dto';
import { Injectable } from '@nestjs/common';
import { customSerialize } from 'src/utils/serialize';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne({
    userId,
    testId,
    score,
    spendedTime,
  }: CreateLeaderboardDto) {
    try {
      const newRecord = await this.prisma.leadBoard.create({
        data: { userId, testId, spendedTime, score, rank: 0 },
      });

      return newRecord;
    } catch (e) {
      return e;
    }
  }

  async findManyByTestId(testId: number, userId?: number) {
    try {
      const leaders = await this.prisma.$queryRaw`
    SELECT
       *,
       RANK() OVER (ORDER BY "score" DESC, "spendedTime" ASC) as "rank"
    FROM 
     "LeadBoard" 
    INNER JOIN
      "User"
    ON
      "User"."id" = "LeadBoard"."userId"
      WHERE
       "LeadBoard"."testId" = ${testId}
   `;

      // this.prisma.leadBoard.findMany({
      //   where: { testId },
      //   include: { user: true },
      //   take: 5,
      //   orderBy: [{ score: 'desc' }, { spendedTime: 'asc' }],
      // });

      // const me = await this.prisma.leadBoard.findFirst({
      //   where: { testId, userId },
      //   include: { user: true },
      // });

      // const alreadyInLeadboard = leaders.some(
      //   (item) => item.userId === me?.userId,
      // );

      return customSerialize(leaders);
    } catch (e) {
      return e;
    }
  }
}
