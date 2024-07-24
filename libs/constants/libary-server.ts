import { HelperModule } from '@app/helper';
import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { IConfig, IConfigAuth } from './configuration-env';
import { Provider } from '@nestjs/common/interfaces';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AllExceptionsFilter } from '@app/core/filters/http-exeption.filter';
import { TransformResponseInterceptor } from '@app/core/interceptors/transform-res.interceptor';
import { JwtAuthenticationModule } from '@app/jwt-authentication';
export const IMPORT_MODULE_COMMON: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference> = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    cache: true,
    // validate: validateEnvironment,
  }),
  HelperModule,
  JwtAuthenticationModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<IConfig, true>) => ({
      ...configService.get<IConfigAuth>('auth'),
    }),
    inject: [ConfigService],
  }),
];

export const PROVIDERS_MODULE_COMMON: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },

  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor,
  },
];
