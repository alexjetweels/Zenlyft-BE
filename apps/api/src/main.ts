import { SetupServerCommon } from 'libs/constants/setup-server';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { StartUrl } from 'libs/constants/enum';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    cors: true,
  });

  await SetupServerCommon(app, 3000, StartUrl.CLIENT);
}
bootstrap();
