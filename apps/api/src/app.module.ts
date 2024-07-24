import { AppController } from './app.controller';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { IMPORT_MODULE_COMMON, PROVIDERS_MODULE_COMMON } from 'libs/constants/libary-server';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'libs/constants/configuration-env';
import { Environment } from 'libs/constants/enum';
import { LoggerReqMiddleware } from '@app/core/middlewares/logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ...IMPORT_MODULE_COMMON,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [...PROVIDERS_MODULE_COMMON, AppService],
})
export class AppModule {
  constructor(private configService: ConfigService<IConfig, true>) {}

  configure(consumer: MiddlewareConsumer) {
    const nodeEnv = this.configService.get<Environment>('nodeEnv');

    if (![Environment.Production].includes(nodeEnv)) {
      consumer.apply(LoggerReqMiddleware).forRoutes('*');
    }
  }
}
