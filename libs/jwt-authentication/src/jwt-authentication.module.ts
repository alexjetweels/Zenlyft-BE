import { JwtAuthenticationService } from './jwt-authentication.service';
import { ConfigurableModuleClass } from './jwt-authentication.module-definition';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [ConfigModule, JwtModule],
  providers: [JwtAuthenticationService],
  exports: [JwtAuthenticationService],
})
export class JwtAuthenticationModule extends ConfigurableModuleClass {}
