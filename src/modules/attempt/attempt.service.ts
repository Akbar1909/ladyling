import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinishAttemptDto } from './dto';

@Injectable()
export class AttemptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(testId: number, userId: number) {
    const test = await this.prisma.test.findUnique({ where: { id: testId } });

    if (!test) {
      return new NotFoundException('test not found');
    }

    if (test.status === 'active') {
      return this.prisma.attempt.create({ data: { testId, userId } });
    }

    return new ForbiddenException('not allowed');
  }

  async finish({ attemptId, questions }: FinishAttemptDto) {
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

    const updatedRecord = await this.prisma.attempt.update({
      where: { id: attemptId },
      data: {
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
    });

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

    const correctCount = res?.responses.filter(
      (response) => response.selectedId === response.correctId,
    ).length;

    const totalCount = res?.test.questions.length;

    return {
      correctCount,
      totalCount,
      ...res,
    };
  }
}
