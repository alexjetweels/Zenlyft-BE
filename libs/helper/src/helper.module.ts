import { Module } from '@nestjs/common';
import { ConfigSystemService } from './config-system/config-system.service';
import { UtilsService } from './utils/utils.service';

@Module({
  providers: [ConfigSystemService, UtilsService],
  exports: [ConfigSystemService, UtilsService],
})
export class HelperModule {}
