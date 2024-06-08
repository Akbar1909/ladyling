import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { PrismaModule } from './prisma/prisma.module';
import { configuration, validationSchema } from './config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { TestModule } from './modules/test/test.module';
import { QuestionModule } from './modules/question/question.module';
import { AttemptModule } from './modules/attempt/attempt.module';
import { LeaderBoardModule } from './modules/leaderboard/leaderboard.module';

@Module({
  imports: [
    NestjsFormDataModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', '/uploads'),
    //   exclude: ['/api/(.*)'],
    // }),
    UsersModule,
    AuthModule,
    UploadModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TestModule,
    QuestionModule,
    AttemptModule,
    LeaderBoardModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
