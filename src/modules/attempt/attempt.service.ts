import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinishAttemptDto } from './dto';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { calculateDifference } from 'src/utils/time';

@Injectable()
export class AttemptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leaderboardService: LeaderboardService,
  ) {}

  async create(testId: number, userId: number) {
    const test = await this.prisma.test.findUnique({ where: { id: testId } });

    const prevAttempts = await this.prisma.attempt.findMany({
      where: { testId, userId },
    });

    if (!test) {
      return new NotFoundException('test not found');
    }

    if (test.status === 'withPrize' && prevAttempts.length !== 0) {
      return new ForbiddenException('already tried');
    }

    if (test.status === 'active' || test.status === 'withPrize') {
      return this.prisma.attempt.create({
        data: {
          testId,
          userId,
          spendedTime: 0,
          isFirstAttempt: prevAttempts.length === 0,
        },
      });
    }

    return new ForbiddenException('not allowed');
  }

  async finish({ attemptId, questions, spendedTime }: FinishAttemptDto) {
    const options = await this.prisma.option.findMany({
      where: {
        questionId: {
          in: questions.map((question) => question.id),
        },
      },
    });

    const optionsMap: Record<
      number,
      {
        id: number;
        questionId: number;
        text: string;
        label: string;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
      }
    > = options.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

    const correctCount = questions.filter(
      ({ selectedId }) => optionsMap[selectedId].isCorrect,
    ).length;

    const record = await this.prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    const updatedRecord = await this.prisma.attempt.update({
      where: { id: attemptId },
      data: {
        spendedTime: calculateDifference(record?.createdAt as any),
        correctCount,
        responses: {
          createMany: {
            data: questions.map(({ id, selectedId }) => {
              const isCorrect = optionsMap[selectedId].isCorrect;

              const newRecord = {
                questionId: id,
                selectedId,
                correctId: isCorrect
                  ? selectedId
                  : (options.find(
                      (option) => option.questionId === id && option.isCorrect,
                    )?.id as number),
                isCorrect,
              };

              return newRecord;
            }),
          },
        },
      },
      include: {
        responses: true,
      },
    });

    if (updatedRecord.isFirstAttempt) {
      await this.leaderboardService.createOne({
        testId: updatedRecord.testId,
        userId: updatedRecord.userId,
        score: updatedRecord.correctCount,
        spendedTime: updatedRecord.spendedTime,
      });
    }

    return updatedRecord;
  }

  async findByIdWithDetails(id: number) {
    const res = await this.prisma.attempt.findUnique({
      where: { id },
      include: {
        responses: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
        test: {
          include: {
            questions: {
              include: { _count: true, options: true },
            },
          },
        },
      },
    });

    const totalCount = res?.test.questions.length;

    return {
      correctCount: res?.correctCount,
      ...res,
      totalCount,
    };
  }

  async getSpendedTime(id: number) {
    const record = await this.prisma.attempt.findUnique({ where: { id } });

    if (!record) {
      return new NotFoundException('record not found');
    }

    return calculateDifference(record.createdAt as any);
  }
}
